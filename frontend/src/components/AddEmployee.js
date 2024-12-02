import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import { addEmployee } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../Employee.css';  // Import the CSS file

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeData = { name, position };

    try {
      await addEmployee(employeeData);
      navigate('/employee-list');
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="employee-container">
      <div className="employee-box">
        <h2>Add Employee</h2>
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
          <Button type="submit" variant="contained" color="primary">Add Employee</Button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
