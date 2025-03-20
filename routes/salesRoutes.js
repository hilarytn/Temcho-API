import express from "express";
import { 
  createSale, 
  getAllSales, 
  getSalesByDate, 
  getSaleById, 
  updateSale, 
  deleteSale 
} from "../controllers/salesController.js";

const router = express.Router();

router.post("/create", createSale);
router.get("/", getAllSales);
router.get("/date", getSalesByDate);
router.get("/:id", getSaleById);
router.put("/:id", updateSale);
router.delete("/:id", deleteSale);

export default router;