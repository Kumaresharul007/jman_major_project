import React, {useState} from "react";
import axios from 'axios'
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        await axios.post('http://localhost:8000/api/login', { username, password });
        localStorage.setItem("admintoken", "123");
        alert('Login successful');
        navigate('/trainingplans');

        // Redirect or update state upon successful login
        } catch (error) {
        console.error('Error logging in:', error);
        toast("Error logging in!")
        // alert('Login failed');
        }
    }

    return (
        <div className="login-container">
            <ToastContainer />
            <form onSubmit={handleLogin} className="login-form">
                <h4 align={"center"}>ADMIN LOGIN</h4><hr/><br></br>
                <div className="input-group">
                <label htmlFor="username">Username:</label>
                <input
                    type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required
                />
                </div>
                <div className="input-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required 
                />
                </div>
                <Button style={{width: "100%"}} type="submit" variant="contained">LOGIN</Button>
            </form>
        </div>    
    )
}
        