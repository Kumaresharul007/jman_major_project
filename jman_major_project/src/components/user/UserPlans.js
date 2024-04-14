import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import UserDashboard from './UserDashboard';
import LinearProgress from '@mui/material/LinearProgress';
import { Button } from '@mui/material';
import Progress from './Progress';

const ProgressBar = ({ startDate, endDate }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const now = new Date();

        const totalTime = end.getTime() - start.getTime();
        const elapsedTime = now.getTime() - start.getTime();

        const calculatedProgress = (elapsedTime / totalTime) * 100;
        setProgress(calculatedProgress > 100 ? 100 : calculatedProgress);
    }, [startDate, endDate]);

    return <LinearProgress style={{height: "10px",}} variant="determinate" value={progress} />;
};

export default function UserPlans() {

    if(localStorage.getItem("usertoken") == null) {
        window.location = '/userlogin'
    }

    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [buttonText, setButtonText] = useState('Mark as complete');
    const [buttonClicked, setButtonClicked] = useState(false);
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

    const markAsComplete = async (email, designation, training_name, start_date, end_date) => {
        window.location.reload();
        // alert("This training has been completed!");
        try {
            // Calculate hours and total_hours
            const startDate = new Date(start_date);
            const endDate = new Date(end_date);
            const hours = Math.ceil(((currentDate-startDate) / (1000 * 60 * 60 * 24)) * 8);
            const totalHours = ((endDate-startDate) / (1000 * 60 * 60 * 24)) * 8;

            // Make POST request to backend
            await axios.post('http://localhost:8000/api/learning_hours', {
                email,
                designation,
                training_name,
                start_date,
                end_date,
                hours,
                totalHours
            });
            setButtonClicked(true);

        } catch (error) {
            console.error('Error marking as complete:', error);
        }
    };

    var l = [];
    data.map((item) => {
        if (currentDate >= new Date(item.start_date)) {
            l.push(item.id)
        }
    });

    const percentage = Math.ceil((data1.length / l.length) * 100);

    if(data.length == 0) {
        return (
          <div>
            <UserDashboard />
            <div align="center" style={{marginTop: "70px"}} className='container'>
              <h4>No trainings found!</h4>
            </div>
          </div>
        )
    }

    const getButtonText = (itemStartDate, item_stat) => {
        if (currentDate < new Date(itemStartDate)) {
            return 'UPCOMING';
        }
        else if(item_stat == "Completed") {
            return 'COMPLETED';
        }
        return buttonText;
    };

    return (
        <div>
            <UserDashboard />
            <div style={{marginTop: "70px"}}>
                <div style={{display: "flex", justifyContent: "center"}}><h6 style={{marginTop: "15px", marginRight: "5px"}}>YOUR PROGRESS</h6><Progress progress={percentage} /></div><br />
                <div className='container'>
                {data.map((item) => (
                <>
                    {/* {(currentDate <= new Date(item.end_date)) && ( */}
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
                                <h6>Training progress:</h6>
                                <ProgressBar startDate={item.start_date} endDate={item.end_date} /><br />
                                <Button
                                    onClick={() => markAsComplete(
                                        localStorage.getItem("email"),
                                        item.designation,
                                        item.training_name,
                                        item.start_date,
                                        item.end_date
                                    )}
                                    disabled={ buttonClicked || getButtonText(item.start_date, item.comp_stat) == "COMPLETED" || currentDate < new Date(item.start_date)}
                                    variant='contained'
                                >
                                    {getButtonText(item.start_date, item.comp_stat)}
                                </Button>
                            </div>
                        </div>  
                    {/* )} */}
                <br />
                </>
                ))}
                </div>
            </div>
        </div>
    )
}
