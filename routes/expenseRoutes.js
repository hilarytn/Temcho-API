import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createExpense, getExpenses, getExpenseById, updateExpense, deleteExpense } from "../controllers/expenseController.js";

const router = express.Router();

router.post("/create", authMiddleware, createExpense);
router.get("/", authMiddleware, getExpenses);
router.get("/:id", authMiddleware, getExpenseById);
router.put("/:id", authMiddleware, updateExpense);
router.delete("/:id", authMiddleware, deleteExpense);

export default router;