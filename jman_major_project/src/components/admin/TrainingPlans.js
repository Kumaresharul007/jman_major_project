import * as React from 'react';
import { useState, useEffect } from 'react';
import AdminDashboard from './AdminDashboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TrainingPlans() {

  if(localStorage.getItem("admintoken") == null) {
    window.location = '/login'
  }

  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/fetch_course');
        const jsonData = await response.json();
        setData(jsonData);
    } catch (error) {
        console.error('Error fetching data', error);
    }
  };
  const handleRemovePlan = async (id) => {
    try {
      // Send a DELETE request to your backend API to remove the plan
      toast("Training removed successfully!");
      await fetch(`http://localhost:8000/api/remove_plan/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Remove the plan from the local state
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error removing plan', error);
    }
  };

  if(data.length == 0) {
    return (
      <div>
        <AdminDashboard />
        <div align="center" style={{marginTop: "70px"}} className='container'>
          <h4>No trianing plans found!</h4>
        </div>
      </div>
    )
  }

  return (
    <>
    <AdminDashboard />
    <ToastContainer />
    <div style={{marginTop: "70px"}} className='container'>
    {data.map((item) => (
    <>
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
        <a onClick={() => handleRemovePlan(item.id)} class="btn btn-danger">Remove this plan</a>
        </div>
    </div>
    <br />
    </>
    ))}
    </div>
    </>
  );
}