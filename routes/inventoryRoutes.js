import express from "express";
import { 
  addInventory, 
  getInventory, 
  updateInventory, 
  deleteInventory 
} from "../controllers/inventoryController.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, isAdmin, addInventory);
router.get("/", authMiddleware, getInventory);
router.put("/:id", authMiddleware, isAdmin, updateInventory);
router.delete("/:id", authMiddleware, isAdmin, deleteInventory);

export default router;