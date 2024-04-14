import React from 'react'
import AdminDashboard from './AdminDashboard'
import { Button } from '@mui/material'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { useState } from 'react';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AssessmentUpload = () => {

  if(localStorage.getItem("admintoken") == null) {
    window.location = '/login'
  }

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('csvFile', file);

    try {
      await axios.post('http://localhost:8000/api/upload_csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast('CSV data uploaded successfully!');
    } catch (error) {
      console.error('Error uploading CSV data:', error);
    }
  };

  return (
    <div>
        <AdminDashboard />
        <ToastContainer />
        <div align={"center"} style={{marginTop: "70px"}} className='container'>
            <h5>UPLOAD THE ASSESSMENT REPORT</h5><br />
            <Button
                variant="contained"
                component="label"
                style={{backgroundColor: "#31119b", width: "80vw"}}
                >
                Upload File
                <FileUploadOutlinedIcon /><br />
                <input type="file" onChange={handleFileChange} name="csvFile" accept=".csv" required/> 
                <Tooltip title="The csv file should contain only the firstname, lastname, email, designation, training name and score">
                <IconButton style={{color: "darkorange"}}>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </Button>
            <p style={{color: "green", marginLeft: "5px"}}>(*upload only csv file)</p>
            <Button onClick={handleUpload} type="submit" variant="contained">SUBMIT</Button>
        </div>
    </div>
  )
}

export default AssessmentUpload