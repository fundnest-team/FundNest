import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './config/db.js';
import userRoutes from "./routes/userRoutes.js";

connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});