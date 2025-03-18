import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// @desc Register user
// @route POST /api/auth/register
// @access Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({ name, email, password: hashedPassword, role });

    res.status(201).json({ status: "success", userId: user._id });
  } catch (error) {
    res.status(500).json({ "status": "Server error", error });
  }
};

// @desc Login user
// @route POST /api/auth/login
// @access Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user existence
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// @desc Logout user
// @route POST /api/auth/logout
// @access Private
export const logoutUser = async (req, res) => {
    try {
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };


  // @desc Get logged-in user details
// @route GET /api/auth/profile
// @access Private
export const getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  // @desc Update user profile
  // @route PUT /api/auth/update-profile
  // @access Private
  export const updateUserProfile = async (req, res) => {
    try {
      const { name, email } = req.body;
      const updatedUser = await User.findByIdAndUpdate(req.user.id, { name, email }, { new: true }).select("-password");
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  // @desc Change password
  // @route PUT /api/auth/change-password
  // @access Private
  export const changePassword = async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) return res.status(400).json({ message: "Incorrect old password" });
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();
  
      res.status(200).json({status: "success", message: "Password changed successfully" });
    } catch (error) {
      res.status(500).json({status: "error", message: "Server error", error });
    }
  };
