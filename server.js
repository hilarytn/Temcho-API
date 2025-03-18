import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

import connectDB from './config/db.js';

dotenv.config()

connectDB()

const app = express();
const PORT = process.env.PORT || 3000;

// // Routes
app.use('/api/users', authRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, ()=> {
    console.log(`Server running on PORT ${PORT}`.underline.yellow)
})