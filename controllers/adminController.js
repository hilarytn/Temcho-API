import User from "../models/User.js";
import Production from "../models/Production.js";

// @desc Get all users
// @route GET /api/admin/users
// @access Private (Admin)
// Get all users with pagination
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const users = await User.find({ isDeleted: false })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select("-password");
    
    const totalUsers = await User.countDocuments({ isDeleted: false });
    res.status(200).json({ users, totalPages: Math.ceil(totalUsers / limit), currentPage: Number(page) });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc Get user by ID
// @route GET /api/admin/users/:id
// @access Private (Admin)
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc Update user details
// @route PUT /api/admin/users/:id
// @access Private (Admin)
export const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    
    // Check if user exists
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email, role }, { new: true }).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// @desc SoftDelete user
// @route SOFT DELETE /api/admin/users/:id/soft
// @access Private (Admin)
// Soft delete user
export const softDeleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    user.isDeleted = true;
    await user.save();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// @desc Delete user
// @route DELETE /api/admin/users/:id
// @access Private (Admin)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc Change user role
// @route PUT /api/admin/users/:id/role
// @access Private (Admin)
export const changeUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select("-password");

    res.status(200).json({ message: "User role updated", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


import Operator from "../models/Operator.js";

export const addOperator = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Operator name is required" });
    }

    const newOperator = await Operator.create({ name });
    res.status(201).json({ message: "Operator added successfully", operator: newOperator });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all operators
export const getAllOperators = async (req, res) => {
  try {
    const operators = await Operator.find();
    res.status(200).json(operators);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get operator by ID
export const getOperatorById = async (req, res) => {
  try {
    const operator = await Operator.findById(req.params.id);
    if (!operator) {
      return res.status(404).json({ message: "Operator not found" });
    }
    res.status(200).json(operator);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Fetch logged-in user details
export const getCurrentUser = async (req, res) => {
  try {
      const user = await User.findById(req.user.id); // Assuming user ID is available in req.user
      if (!user) return res.status(404).json({ message: "User not found" });

      res.status(200).json({
          username: user.name,
          // Add other user fields as needed
      });
  } catch (error) {
      res.status(500).json({ message: "Server error", error });
  }
};


export const getDashboardStats = async (req, res) => {
  try {
      const totalUsers = await User.countDocuments();
      const totalProductions = await Production.countDocuments();
      const pendingApprovals = await User.countDocuments({ status: 'pending' }); // Modify as needed
      const systemHealth = 'Good'; // You can implement more complex health checks here

      res.status(200).json({
          totalUsers,
          totalProductions,
          pendingApprovals,
          systemHealth
      });
  } catch (error) {
      res.status(500).json({ message: "Server error", error });
  }
};

