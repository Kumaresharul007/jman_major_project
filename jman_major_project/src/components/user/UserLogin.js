import {React, useState} from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserLogin() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        const res = await axios.post('http://localhost:8000/api/user_login', { email, password });
        alert('Login successful');
        if(res.data.user_stat == true) {
            localStorage.setItem("designation", res.data.user_designation);
            localStorage.setItem("name", res.data.user_firstname+" "+res.data.user_lastname);
            localStorage.setItem("email", res.data.user_email);
            localStorage.setItem("usertoken", "456");
            navigate('/changepassword');
        }
        else if(res.data.user_stat == false) {
            localStorage.setItem("designation", res.data.user_designation);
            localStorage.setItem("name", res.data.user_firstname+" "+res.data.user_lastname);
            localStorage.setItem("email", res.data.user_email);
            localStorage.setItem("usertoken", "456");
            navigate('/userplans');
        }
        // Redirect or update state upon successful login
        } catch (error) {
        console.error('Error logging in:', error);
        toast("Invalid credentials")
        }
    };

    return (
        <div className="login-container">
            <ToastContainer />
            <form onSubmit={handleLogin} className="login-form">
                <h4 align={"center"}>TRAINEE LOGIN</h4><hr/><br></br>
                <div className="input-group">
                <label htmlFor="username">Email:</label>
                <input 
                    type="email" name="username" value={email} onChange={(e) => setEmail(e.target.value)} required 
                />
                </div>
                <div className="input-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                />
                </div>
                <Button type="submit" style={{width: "100%"}} variant="contained">LOGIN</Button>
            </form>
        </div>    
    )
}
        