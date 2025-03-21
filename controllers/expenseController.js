import Expense from "../models/Expense.js";

// Expenses Controllers
export const createExpense = async (req, res) => {
    try {
      const { date, category, amount, description } = req.body;
      const userId = req.user.id;
  
      const newExpense = new Expense({
        date,
        category,
        amount,
        description,
        user: userId,
      });
  
      await newExpense.save();
      res.status(201).json(newExpense);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getExpenses = async (req, res) => {
    try {
      const expenses = await Expense.find();
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
};
  
export const getExpenseById = async (req, res) => {
    try {
      const expense = await Expense.findById(req.params.id);
      if (!expense) return res.status(404).json({ message: "Expense not found" });
      res.status(200).json(expense);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
};
  
export const updateExpense = async (req, res) => {
    try {
      const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedExpense) return res.status(404).json({ message: "Expense not found" });
      res.status(200).json(updatedExpense);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
};
  
export const deleteExpense = async (req, res) => {
    try {
      await Expense.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
};