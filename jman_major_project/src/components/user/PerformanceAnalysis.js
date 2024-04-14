import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PerformanceAnalysis() {

    const [data, setData] = useState([]);
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

    var x = [];
    var y = [];

    if (Array.isArray(data) && data.length > 0) {
        // Map over the data array and push values to x and y arrays
        data.forEach((item) => {
            if (item.training_name && item.score) {
                x.push(item.training_name);
                y.push(item.score);
            }
        });
    } else {
        return <div>No data available</div>;
    }
    return (
    <BarChart
        xAxis={[{ scaleType: 'band', data: x }]}
        series={[{ data: y }]}
        width={500}
        height={360}
    />
    );
}
