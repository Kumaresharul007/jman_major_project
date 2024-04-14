import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import AdminDashboard from "./AdminDashboard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserCreation() {

    if(localStorage.getItem("admintoken") == null) {
        window.location = '/login'
    }

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [designation, setDesignation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await axios.post('http://localhost:8000/api/register_user', { firstname, lastname, email, designation });
        toast('Registration successful and the mail has been sent to the user!');
        } catch (error) {
        console.error('Error registering user:', error);
        toast('Registration failed');
        }
    };

    return (
        <div>
            <AdminDashboard />
            <div className="login-container">
                <ToastContainer />
                <form onSubmit={handleSubmit} className="login-form">
                    <h4 align={"center"}>USER REGISTRATION</h4><hr/><br></br>
                    <div className="input-group">
                    <label htmlFor="firstname">FirstName:</label>
                    <input
                        type="text" value={firstname} onChange={(e) => setFirstName(e.target.value)} required
                    />
                    </div>
                    <div className="input-group">
                    <label htmlFor="lastname">LastName:</label>
                    <input
                        type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} required
                    />
                    </div>
                    <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                    />
                    </div>
                    <div className="input-group">
                        <div style={{width: "100%"}}>
                            <label htmlFor="designation">Designation:</label>
                            <select value={designation} onChange={(e) => setDesignation(e.target.value)} required>
                                <option value="">--select--</option>
                                <option value="Employee">Employee</option>
                                <option value="Intern">Intern</option>
                            </select>
                        </div>
                    </div>
                    <Button type="submit" style={{width: "100%"}} variant="contained">CREATE USER</Button>
                </form>
            </div>    
        </div>
    )
}
        