import mongoose from "mongoose";

// Expenses Schema
const expenseSchema = new mongoose.Schema(
  {
    date: { type: String, required: true }, // Format: YYYY-MM-DD
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);