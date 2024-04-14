import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import { Button } from '@mui/material';

const CourseCreation = () => {
  const [formData, setFormData] = useState({
    page1: {
      designation: '',
      name: '',
      trainer_name: ''
    },
    page2: {
      start: '',
      end: '',
      no_of_days: ''
    },
    page3: {
      des: ''
    }
  });

  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [`page${currentPage}`]: {
        ...prevState[`page${currentPage}`],
        [name]: value
      }
    }));
  };

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send formData to backend API
    try {
      await axios.post('http://localhost:8000/api/create_course', { formData });
      alert('Training assigned successfully!');
      navigate('/trainingplans');
      // Redirect or update state upon successful login
      } catch (error) {
      console.error('Error creating the course:', error);
      alert('Creation failed');
    }
  };

  return (
    <><AdminDashboard />
    <div style={{marginTop: "70px"}}>
      <h5 align={"center"}>CREATE A TRAINING PLAN</h5><br />
      <form onSubmit={handleSubmit} className='container'>
          {currentPage === 1 && (
            <div>
                <label>Designation:</label>
                <select name='designation' value={formData.page1.designation} onChange={handleChange} required>
                    <option value="">--select--</option>
                    <option value="Employee">Employee</option>
                    <option value="Intern">Intern</option>
                </select>
                <br /><br />
                <label>Training Name:</label>
                <input type="text" name="name" value={formData.page1.name} onChange={handleChange} required/>
                <br /><br />
                <label>Trainer Name:</label>
                <input type="text" name="trainer_name" value={formData.page1.trainer_name} onChange={handleChange} required/>
                <br /><br />
                <Button onClick={nextPage} style={{width: "100%"}} variant="contained">NEXT</Button>
            </div>
          )}
          {currentPage === 2 && (
            <div>
                <label>Start Date:</label>
                <input type="date" name="start" value={formData.page2.start} onChange={handleChange} required/>
                <br /><br />
                <label>End Date:</label>
                <input type="date" name="end" value={formData.page2.end} onChange={handleChange} required/>
                <br /><br />
                <label>No of days:</label>
                <input type="text" name="no_of_days" value={formData.page2.no_of_days} onChange={handleChange} required/>
                <br /><br />
                <Button onClick={nextPage} style={{width: "100%"}} variant="contained">NEXT</Button><br /><br />
                <Button onClick={prevPage} style={{width: "100%"}} variant="contained">PREVIOUS</Button>
            </div>
          )}
          {currentPage === 3 && (
            <div>
                <label>Course Description</label>
                <textarea name="des" value={formData.page3.des} onChange={handleChange} rows={4} cols={100}></textarea><br /><br />
                <Button onClick={prevPage} style={{width: "100%"}} variant="contained">PREVIOUS</Button><br /><br />
                <Button type="submit" style={{width: "100%"}} variant="contained">SUBMIT</Button>
            </div>
          )}
      </form>
    </div>
    </>
  );
};

export default CourseCreation;
