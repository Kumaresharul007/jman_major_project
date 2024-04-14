import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';

export default function Home() {  
    return(
        <div className='home-container'>
            <div className='container'>
                <h1 style={{color: "orange", fontFamily: "Lucida Console, Courier New, monospace"}}>Hey, Welcome to our platform!</h1><br />
                <h5 style={{color: "white", fontFamily: 'Arial, sans-serif'}}>LOGIN AS</h5><br />
                <Stack style={{display: "flex", justifyContent: "center"}} spacing={10} direction="row">
                    <Link to='/login'><Button variant="contained">Admin</Button></Link>
                    <Link to='/userlogin'><Button variant="contained">Trainee</Button></Link>
                </Stack>
            </div>
        </div>
    )
}  