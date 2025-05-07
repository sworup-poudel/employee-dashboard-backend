import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
import employeeRoutes from './routes/employeeRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Connect DB
connectDB();

// Middleware
app.use(express.json());

// Sample route
app.get('/', (_req, res) => {
  var a = 1;
  debugger;
  res.send('API is running...');
});

app.use('/api/employees', employeeRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
