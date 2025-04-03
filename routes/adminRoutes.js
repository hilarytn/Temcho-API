import express from "express";
import { 
    getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser, 
    changeUserRole, 
    softDeleteUser,
    addOperator,
    getAllOperators,
    getOperatorById,
    getCurrentUser,
    getDashboardStats} from "../controllers/adminController.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", authMiddleware, isAdmin, getAllUsers);
router.get("/users/:id", authMiddleware, isAdmin, getUserById);
router.put("/users/:id", authMiddleware, isAdmin, updateUser);
router.delete("/users/:id", authMiddleware, isAdmin, deleteUser);
router.delete("/users/:id/soft", authMiddleware, isAdmin, softDeleteUser);
router.put("/users/:id/role", authMiddleware, isAdmin, changeUserRole);
router.post("/add-operator",authMiddleware, isAdmin, addOperator);
router.get("/operators", authMiddleware, isAdmin, getAllOperators);
router.get("/operator/:id", authMiddleware, isAdmin, getOperatorById);
router.get("/user/me", authMiddleware, isAdmin, getCurrentUser);
router.get("/dashboard/stats", authMiddleware, isAdmin, getDashboardStats);

export default router;
