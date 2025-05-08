import { Router} from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

// GET /api/employees
router.get('/', async (req, res) => {
  debugger;
  const filePath = path.join(__dirname, '../data/employees.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  const employees = JSON.parse(data);
  res.json(employees);
});

//POST /api/employees
router.post('/', async (req, res) => {
  const filePath = path.join(__dirname, '../data/employees.json');
  
  const data = fs.readFileSync(filePath, 'utf-8');
  const employees = JSON.parse(data);

  const { firstName, lastName, email, department } = req.body;

  const newEmployee = {
    id: employees.length + 1,
    firstName, 
    lastName,
    email,
    department
  };

  employees.push(newEmployee);
  fs.writeFileSync(filePath, JSON.stringify(employees, null, 2), 'utf-8');

  res.status(201).json(newEmployee);
});

//Put /api/employees/:id
// Update an employee by ID
router.put('/:id', async (req, res) => {
  const filePath = path.join(__dirname, '../data/employees.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  const employees = JSON.parse(data);
  const employeeId = parseInt(req.params.id);
  const index = employees.findIndex((emp: { id: number }) => emp.id === employeeId);


  if (index === -1) {
    res.status(404).json({ message: 'Employee not found' });
  }
    // Get only provided fields
    const updatedFields = req.body;

    // Update only the provided fields
    employees[index] = {
      ...employees[index],
      ...updatedFields,
    };
  

  fs.writeFileSync(filePath, JSON.stringify(employees, null, 2), 'utf-8');
  res.json(employees[index]);
});

//Delete /api/employees/:id
// Delete an employee by ID
router.delete('/:id', async (req, res) => {
  const filePath = path.join(__dirname, '../data/employees.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  const employees = JSON.parse(data); 
  const employeeId = parseInt(req.params.id);
  const index = employees.findIndex((emp: { id: number }) => emp.id === employeeId);
  if (index === -1) {
    res.status(404).json({ message: 'Employee not found' });
  }

  employees.splice(index, 1);
  fs.writeFileSync(filePath, JSON.stringify(employees, null, 2), 'utf-8');
  res.status(200).send();
});

export default router;
