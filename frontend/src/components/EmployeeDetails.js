import React, { useState, useEffect } from 'react';
import { Container, Button } from '@mui/material';
import { getEmployeeDetails } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import '../Employee.css';  

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const data = await getEmployeeDetails(id);
        setEmployee(data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };
    fetchEmployeeDetails();
  }, [id]);

  return (
    <div className="employee-container">
      <div className="employee-box">
        <h2>Employee Details</h2>
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Position:</strong> {employee.position}</p>
        <Button variant="outlined" onClick={() => navigate('/employee-list')}>Back to List</Button>
      </div>
    </div>
  );
};

export default EmployeeDetails;
