import React, { useState, useEffect } from 'react';
import { TextField, Button, Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployeeDetails, updateEmployee } from '../services/api';
import '../Employee.css';  

const EditEmployee = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployeeDetails(id);
        setName(data.name);
        setPosition(data.position);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEmployee = { name, position };

    try {
      await updateEmployee(id, updatedEmployee);
      navigate('/employee-list');
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="employee-container">
      <div className="employee-box">
        <h2>Update Employee</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Position"
            variant="outlined"
            fullWidth
            margin="normal"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">Update Employee</Button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
