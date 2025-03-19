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
router.post("/create", authMiddleware, createProductionRecord);
router.get("/all", authMiddleware, getAllProductionRecords);
router.get("/:id", authMiddleware, getProductionRecordById);
router.put("/:id", authMiddleware, isAdmin, updateProductionRecord);
router.delete("/:id", authMiddleware, isAdmin, deleteProductionRecord);

export default router;
