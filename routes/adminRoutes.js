import express from "express";
import { 
    getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser, 
    changeUserRole } from "../controllers/adminController.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", authMiddleware, isAdmin, getAllUsers);
router.get("/users/:id", authMiddleware, isAdmin, getUserById);
router.put("/users/:id", authMiddleware, isAdmin, updateUser);
router.delete("/users/:id", authMiddleware, isAdmin, deleteUser);
router.put("/users/:id/role", authMiddleware, isAdmin, changeUserRole);

export default router;
