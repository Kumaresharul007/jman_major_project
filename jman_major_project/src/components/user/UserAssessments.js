import React from 'react'
import UserDashboard from './UserDashboard';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import PerformanceAnalysis from './PerformanceAnalysis';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const UserAssessments = () => {

  if(localStorage.getItem("usertoken") == null) {
    window.location = '/userlogin'
  }

  const [data, setData] = useState([]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
      setOpen(true);
  };
  const handleClose = () => {
      setOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        const response = await axios.post('http://localhost:8000/api/fetch_assessments', { email: localStorage.getItem("email") });
        setData(response.data);
    } catch (error) {
        console.error('Error fetching data', error);
    }
  };

  var count = 1;

  if(data.length == 0) {
    return (
      <div>
        <UserDashboard />
        <div align="center" style={{marginTop: "70px"}} className='container'>
          <h4>No assessment records found!</h4>
        </div>
      </div>
    )
  }

  return (
  <div>

    <React.Fragment>
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
        <PerformanceAnalysis />
        </BootstrapDialog>
    </React.Fragment>

    <UserDashboard />
    <div align="center" style={{marginTop: "70px"}} className='container'>
    <Button onClick={handleClickOpen} style={{backgroundColor: "green"}} variant="contained">Performance analysis <BarChartOutlinedIcon /></Button><br /><br />
    <table className="table">
          <thead className="thead-dark">
              <tr>
              <th style={{backgroundColor: "#31119b", color: "white"}} scope="col">S.No.</th>
              <th style={{backgroundColor: "#31119b", color: "white"}} scope="col">Training Name</th>
              <th style={{backgroundColor: "#31119b", color: "white"}} scope="col">Assessment Score</th>
              </tr>
          </thead>
          <tbody>
              {data.map((item) => (
              <tr>
                  <th scope="row">{count++}</th>
                  <td>{item.training_name}</td>
                  <td>{item.score}</td>
              </tr>
              ))}
          </tbody>
    </table>
    </div>
  </div>
  )
}

export default UserAssessments