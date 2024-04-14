import * as React from 'react';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

export default function UsersDisplay() {

    const [data, setData] = useState([]);
    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
          const response = await fetch('http://localhost:8000/api/fetch_users');
          const jsonData = await response.json();
          setData(jsonData);
      } catch (error) {
          console.error('Error fetching data', error);
      }
    };

    const handleRemovePlan = async (id) => {
        try {
          // Send a DELETE request to your backend API to remove the plan
          alert("User removed successfully!");
          await fetch(`http://localhost:8000/api/remove_user/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          // Remove the plan from the local state
          setData(data.filter(item => item.id !== id));
        } catch (error) {
          console.error('Error removing user', error);
        }
    };

    var count = 1;

    if(data.length == 0) {
        return (
            <h4 style={{padding: "50px"}}>No users found!</h4>
        )
    }

    return (
        <div>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                <th style={{backgroundColor: "#31119b", color: "white"}} scope="col">S.No.</th>
                <th style={{backgroundColor: "#31119b", color: "white"}} scope="col">Name</th>
                <th style={{backgroundColor: "#31119b", color: "white"}} scope="col">Designation</th>
                <th style={{backgroundColor: "#31119b", color: "white"}} scope="col">Email ID</th>
                <th style={{backgroundColor: "#31119b", color: "white"}} scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                <tr>
                    <th scope="row">{count++}</th>
                    <td>{item.firstname+" "+item.lastname}</td>
                    <td>{item.designation}</td>
                    <td>{item.email}</td>
                    <td onClick={() => handleRemovePlan(item.id)} style={{color: "red", cursor: "pointer"}}>{<DeleteIcon />}</td>
                </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
}
