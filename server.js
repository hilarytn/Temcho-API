import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from "cors";
import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import productionRoutes from './routes/productionRoutes.js'
import salesRoutes from './routes/salesRoutes.js'
import expenseRoutes from './routes/expenseRoutes.js'
import inventoryRoutes from './routes/inventoryRoutes.js'
import maintenanceRoutes from './routes/maintenanceRoutes.js'
import customerRoutes from './routes/customerRoutes.js'

import connectDB from './config/db.js';

dotenv.config()

connectDB()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// // Routes
app.use('/api/v1/users', authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/production", productionRoutes);
app.use("/api/v1/sales", salesRoutes)
app.use("/api/v1/expense", expenseRoutes)
app.use("/api/v1/inventory", inventoryRoutes)
app.use("/api/v1/maintenance", maintenanceRoutes)
app.use("/api/v1/customer", customerRoutes)

app.listen(PORT, ()=> {
    console.log(`Server running on PORT ${PORT}`.underline.yellow)
})