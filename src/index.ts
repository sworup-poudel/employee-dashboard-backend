import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
import employeeRoutes from './routes/employeeRoutes';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();
// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/employees', employeeRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
