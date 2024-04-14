const express = require('express');
const bcrypt = require('bcrypt');
var cors = require('cors')
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const multer = require('multer');
const fs = require('fs');
const csvParser = require('csv-parser');

const app = express();
const PORT = process.env.PORT || 8000;

// PostgreSQL connection
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'myproject',
  password: 'admin123',
  port: 5000,
});

// Middleware
app.use(cors())
app.use(bodyParser.json());
// app.get('/',async (req, res) => {res.send("DB Connected")})

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kumaresharul2003@gmail.com',
    pass: 'zqwu gzbx jvcm bhvq'
  }
});

// Register endpoint
app.post('/api/register', async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query('INSERT INTO admin_login (username, password) VALUES ($1, $2)', [username, hashedPassword]);
      res.status(201).send('User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).send('Server Error');
    }
});

app.post('/api/register_user', async (req, res) => {
    try {
      const { firstname, lastname, email, designation } = req.body;
      pass = crypto.randomBytes(Math.ceil(7)).toString('hex').slice(0, 7);
      const hashedPassword2 = await bcrypt.hash(pass, 10);
      await pool.query('INSERT INTO users (firstname, lastname, email, pass, new_user, designation) VALUES ($1, $2, $3, $4, $5, $6)', [firstname, lastname, email, hashedPassword2, true, designation]);
      res.status(201).json({ message: 'User registered successfully' });

      // Send email with login link
      const mailOptions = {
        from: 'kumaresharul2003@gmail.com',
        to: req.body.email,
        subject: 'Registration successful',
        html: `<p>Thank you for registering!</p><p>Click <a href="http://localhost:3000/userlogin">here</a> to log in and change the password.</p><b>Your default password is: ${pass}</b>`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send('Error sending email');
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).send('Registration email sent');
        }
      });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Server Error' });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await pool.query('SELECT * FROM admin_login WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(401).send('Invalid credentials');
    }
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send('Invalid credentials');
    }
    res.status(200).send('Login successful');
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Server Error');
  }
});

app.post('/api/user_login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    user_stat = result.rows[0]["new_user"];
    user_designation = result.rows[0]["designation"];
    user_firstname = result.rows[0]["firstname"];
    user_lastname = result.rows[0]["lastname"];
    user_email = result.rows[0]["email"];
    if (result.rows.length === 0) {
      return res.status(401).send('Invalid credentials');
    }
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.pass);
    if (!match) {
      return res.status(401).send('Invalid credentials');
    }
    res.status(200).send({ user_stat: user_stat, user_designation: user_designation, user_firstname: user_firstname, user_lastname: user_lastname, user_email: user_email }); 
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Server Error');
  }
});

// Route to update password
app.post('/api/change_pass', async (req, res) => {
  const { email, confirm_password } = req.body;
  const hashedPassword3 = await bcrypt.hash(confirm_password, 10);
  try {
    await pool.query('UPDATE users SET pass = $1, new_user = $2 WHERE email = $3', [hashedPassword3, false, email]);
    res.status(200).send('Password updated successfully');
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).send('Internal server error');
  }
});

app.post('/api/create_course', async (req, res) => {

  const designation = req.body.formData.page1.designation;
  const training_name = req.body.formData.page1.name;
  const trainer_name = req.body.formData.page1.trainer_name;
  const start_date = req.body.formData.page2.start;
  const end_date = req.body.formData.page2.end;
  const no_of_days = req.body.formData.page2.no_of_days;
  const des = req.body.formData.page3.des;

  try {
      await pool.query('INSERT INTO training_plans (designation,training_name,trainer_name,start_date,end_date,no_of_days,des) VALUES ($1,$2,$3,$4,$5,$6,$7)', [designation,training_name,trainer_name,start_date,end_date,no_of_days,des]);
      res.status(201).json({ message: 'Data stored successfully' });
  } catch (error) {
      console.error('Error executing query', error);
      res.status(500).send('Internal server error');
  }
});

// Fetching the data

app.get('/api/fetch_course', async (req, res) => {
  try {
      const result = await pool.query('select * from training_plans');
      res.send(result.rows);
  } catch (error) {
      console.error('Error fetching data', error);
      res.status(500).send('Internal server error');
  }
});

app.get('/api/fetch_users', async (req, res) => {
  try {
      const result = await pool.query('select * from users');
      res.send(result.rows);
  } catch (error) {
      console.error('Error fetching data', error);
      res.status(500).send('Internal server error');
  }
});

app.post('/api/fetch_usercourse', async (req, res) => {
  try {
    const designation  = req.body;
    // const result = await pool.query('select * from training_plans where designation = $1 ORDER BY start_date', [designation.designation]);
    const result = await pool.query(`
      SELECT training_plans.*, completed_hours.comp_stat
      FROM training_plans
      LEFT JOIN completed_hours ON training_plans.training_name = completed_hours.training_name
      WHERE training_plans.designation = $1
      ORDER BY training_plans.start_date
    `, [designation.designation]);
    res.send(result.rows);
  }
  catch (error) {
    console.error('Error fetching data', error);
    res.status(500).send('Internal server error');
  }
});

app.post('/api/fetch_hours', async (req, res) => {
  try {
    const email  = req.body;
    // const result = await pool.query('select * from training_plans where designation = $1 ORDER BY start_date', [designation.designation]);
    const result = await pool.query(`
      SELECT training_plans.*, completed_hours.training_name
      FROM training_plans
      RIGHT JOIN completed_hours ON training_plans.training_name = completed_hours.training_name
      WHERE completed_hours.email = $1
      ORDER BY training_plans.start_date
    `, [email.email]);
    res.send(result.rows);
  }
  catch (error) {
    console.error('Error fetching data', error);
    res.status(500).send('Internal server error');
  }
});

app.post('/api/fetch_assessments', async (req, res) => {
  try {
    const email  = req.body;
    const result = await pool.query('select * from assessments where email=$1', [email.email]);
    res.send(result.rows);
  }
  catch (error) {
    console.error('Error fetching data', error);
    res.status(500).send('Internal server error');
  }
});

app.delete('/api/remove_plan/:id', async (req, res) => {
  const planId = req.params.id;

  try {
    // Execute DELETE query to remove the plan from the database
    const queryText = 'DELETE FROM training_plans WHERE id = $1';
    await pool.query(queryText, [planId]);

    // Send success response
    res.status(200).json({ message: 'Plan removed successfully' });
  } catch (error) {
    // If an error occurs, send an error response
    console.error('Error removing plan:', error);
    res.status(500).json({ message: 'Error removing plan' });
  }
});

app.delete('/api/remove_user/:id', async (req, res) => {
  const planId = req.params.id;

  try {
    // Execute DELETE query to remove the plan from the database
    const queryText = 'DELETE FROM users WHERE id = $1';
    await pool.query(queryText, [planId]);

    // Send success response
    res.status(200).json({ message: 'User removed successfully' });
  } catch (error) {
    // If an error occurs, send an error response
    console.error('Error removing user:', error);
    res.status(500).json({ message: 'Error removing user' });
  }
});

//assessment file submission
const upload = multer({ dest: 'uploads/' });
app.post('/api/upload_csv', upload.single('csvFile'), (req, res) => {
  const filePath = req.file.path;
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (row) => {
      // Insert data into PostgreSQL database
      pool.query('INSERT INTO assessments (firstname, lastname, email, designation, training_name, score) VALUES ($1, $2, $3, $4, $5, $6)', [row.firstname, row.lastname, row.email, row.designation, row.training_name, row.score], (error) => {
        if (error) {
          console.error('Error inserting data:', error);
        }
      });
    })
    .on('end', () => {   
      res.send('CSV data uploaded successfully');
    });
});

app.post('/api/learning_hours', async (req, res) => {
  try {
    const { email, designation, training_name, start_date, end_date, hours, totalHours } = req.body;
    // Insert data into PostgreSQL database
    await pool.query('INSERT INTO completed_hours (email, designation, training_name, start_date, end_date, hours, total_hours, comp_stat) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [email, designation, training_name, start_date, end_date, hours, totalHours, "Completed"]);

    // Send response
    res.status(200).json({ message: 'Data stored successfully' });
  } catch (error) {
      console.error('Error storing data:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});