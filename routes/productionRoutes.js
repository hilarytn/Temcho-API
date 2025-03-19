import express from "express";
import { 
    createProductionRecord, 
    getAllProductionRecords, 
    getProductionRecordById, 
    updateProductionRecord, 
    deleteProductionRecord 
} from "../controllers/productionController.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes for production records
router.post("/production", authMiddleware, createProductionRecord);
router.get("/production", authMiddleware, getAllProductionRecords);
router.get("/production/:id", authMiddleware, getProductionRecordById);
router.put("/production/:id", authMiddleware, isAdmin, updateProductionRecord);
router.delete("/production/:id", authMiddleware, isAdmin, deleteProductionRecord);

export default router;
