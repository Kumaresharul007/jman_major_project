import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import UserDashboard from './UserDashboard';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import Progress from './Progress';

export default function CompletedPlans() {

    if(localStorage.getItem("usertoken") == null) {
        window.location = '/userlogin'
    }

    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const currentDate = new Date();

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/fetch_usercourse', { designation: localStorage.getItem("designation") });
            const response1 = await axios.post('http://localhost:8000/api/fetch_hours', { email: localStorage.getItem("email") });
            setData(response.data);
            setData1(response1.data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    var l = [];
    data.map((item) => {
        if (currentDate >= new Date(item.start_date)) {
            l.push(item.id)
        }
    });

    if(data1.length == 0) {
        return (
          <div>
            <UserDashboard />
            <div align="center" style={{marginTop: "70px"}} className='container'>
              <h4>No trainings found!</h4>
            </div>
          </div>
        )
    }

    const percentage = Math.ceil((data1.length / l.length) * 100);

    return (
        <div>
            <UserDashboard />
            <div style={{marginTop: "70px"}}>
                <div style={{display: "flex", justifyContent: "center"}}><h6 style={{marginTop: "15px", marginRight: "5px"}}>YOUR PROGRESS</h6><Progress progress={percentage} /></div><br />
                <div className='container'>
                {data1.map((item) => (
                <>
                    {/* {(currentDate > new Date(item.end_date)) ? ( */}
                        <div class="card">
                            <div style={{backgroundColor: "#31119b", color: "white"}} class="card-header">
                                Designation: {item.designation}
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Training Name: {item.training_name}</h5>
                                <h5 class="card-title">Trainer Name: {item.trainer_name}</h5><hr />
                                <p class="card-text">Start date: {item.start_date.split("T")[0]}</p>
                                <p class="card-text">End date: {item.end_date.split("T")[0]}</p>
                                <p class="card-text">No of days: {item.no_of_days}</p>
                                <p class="card-text">Training description: {item.des}</p>
                                <p style={{color: "darkgreen"}}>< DoneAllOutlinedIcon/> Completed</p>
                            </div>
                        </div>  
                    {/* ) : (
                        null
                    )} */}
                <br />
                </>
                ))}
                </div>
            </div>
        </div>
    )
}
