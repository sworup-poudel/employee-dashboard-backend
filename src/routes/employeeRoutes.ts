import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

// GET /api/employees
router.get('/', async (req, res) => {
  // TODO: Read the employees.json file and send it as a response
});

export default router;
