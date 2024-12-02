import React, { useEffect, useState } from 'react';
import { Button, Table, TableHead, TableRow, TableCell, TableBody, Container, TextField } from '@mui/material';
import { getEmployees, deleteEmployee } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../Employee2.css';  // Import the updated CSS file

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Filter employees based on search query
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter(employee => employee._id !== id)); // Remove from UI
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="employee-container">
      <div className="employee-box">
        <h2>Employee List</h2>

        {/* Search Bar */}
        <TextField
          label="Search by Name or Position"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Add Employee Button */}
        <Button
          variant="contained"
          className="add-employee-button"
          onClick={() => navigate('/add-employee')}
        >
          Add Employee
        </Button>

        {/* Employee Table */}
        <Table className="employee-table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map(employee => (
                <TableRow key={employee._id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>
                    <div className="action-buttons">
                      <Button
                        variant="outlined"
                        onClick={() => navigate(`/employee-details/${employee._id}`)}
                      >
                        View
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => navigate(`/edit-employee/${employee._id}`)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDelete(employee._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No employees found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EmployeeList;
