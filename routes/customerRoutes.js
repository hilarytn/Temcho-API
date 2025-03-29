import express from "express";
import { createCustomer, getCustomers, updateCustomer, deleteCustomer, getCustomerById } from "../controllers/customerController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createCustomer);
router.get("/:id", authMiddleware, getCustomerById);
router.get("/", authMiddleware, getCustomers);
router.put("/:id", authMiddleware, updateCustomer);
router.delete("/:id", authMiddleware, deleteCustomer);

export default router;