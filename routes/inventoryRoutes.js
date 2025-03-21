import express from "express";
import { 
  addInventory, 
  getInventory, 
  updateInventory, 
  deleteInventory, 
  getInventoryById
} from "../controllers/inventoryController.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, isAdmin, addInventory);
router.get("/", authMiddleware, getInventory);
router.get("/:id", authMiddleware, getInventoryById);
router.put("/:id", authMiddleware, isAdmin, updateInventory);
router.delete("/:id", authMiddleware, isAdmin, deleteInventory);

export default router;