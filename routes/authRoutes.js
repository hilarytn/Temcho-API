import express from "express";
import { 
    registerUser, 
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    changePassword  } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/profile", authMiddleware, getUserProfile);
router.put("/update-profile", authMiddleware, updateUserProfile);
router.put("/change-password", authMiddleware, changePassword);

export default router;