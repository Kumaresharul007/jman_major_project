import {React, useState} from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [create_password, setCreatePassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');

    const handlechange = async (e) => {
        e.preventDefault();

        if (create_password !== confirm_password) {
            alert('Passwords do not match');
            return;
        }

        try {
        await axios.post('http://localhost:8000/api/change_pass', { email, confirm_password });
        alert('Password updated successfully!');
        navigate('/userplans');

        // Redirect or update state upon successful login
        } catch (error) {
        console.error('Error logging in:', error);
        alert('Failed to update password');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handlechange} className="login-form">
                <h4 align={"center"}>CHANGE PASSWORD</h4><hr/><br></br>
                <div className="input-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                />
                </div>
                <div className="input-group">
                <label htmlFor="create_password">Create Password:</label>
                <input
                    type="password" name="create_password" value={create_password} onChange={(e) => setCreatePassword(e.target.value)} required
                />
                </div>
                <div className="input-group">
                <label htmlFor="confirm_password">Confirm Password:</label>
                <input
                    type="password" name="confirm_password" value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} required
                />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>    
    )
}
        