import express from "express";
import { 
  createSale, 
  getAllSales, 
  //getSalesByDate, 
  getSaleById, 
  updateSale, 
  deleteSale 
} from "../controllers/salesController.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create",  authMiddleware, isAdmin, createSale);
router.get("/", authMiddleware, isAdmin, getAllSales);
//router.get("/date", authMiddleware, isAdmin, getSalesByDate);
router.get("/:id", authMiddleware, isAdmin, getSaleById);
router.put("/:id", authMiddleware, isAdmin, updateSale);
router.delete("/:id", authMiddleware, isAdmin, deleteSale);

export default router;