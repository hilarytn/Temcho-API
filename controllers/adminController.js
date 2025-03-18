import User from "../models/User.js";

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
