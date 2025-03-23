// Maintenance Routes
import express from "express";
import { createMaintenance, getMaintenances, getMaintenanceById, updateMaintenance, deleteMaintenance } from "../controllers/maintenanceController.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, isAdmin, createMaintenance);
router.get("/", authMiddleware, getMaintenances);
router.get("/:id", authMiddleware, getMaintenanceById);
router.put("/:id", authMiddleware, isAdmin, updateMaintenance);
router.delete("/:id", authMiddleware, isAdmin, deleteMaintenance);

export default router;