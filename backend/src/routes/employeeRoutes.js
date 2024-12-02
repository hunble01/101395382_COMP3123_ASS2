const express = require('express');
const router = express.Router();
const {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');

// Employee routes
router.get('/', getEmployees);
router.get('/:id', getEmployeeById);
router.post('/', addEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
