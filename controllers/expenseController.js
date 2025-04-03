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
  
// export const getExpenses = async (req, res) => {
//   try {
//       const { page = 1, limit = 5, startDate, endDate } = req.query;
      
//       const pageNumber = parseInt(page);
//       const pageLimit = parseInt(limit);
      
//       let dateFilter = {};
//       if (startDate && endDate) {
//           dateFilter = {
//               date: {
//                   $gte: new Date(startDate),
//                   $lte: new Date(endDate)
//               }
//           };
//       } else {
//           const today = new Date();
//           const startOfDay = new Date(today.setHours(0, 0, 0, 0));
//           const endOfDay = new Date(today.setHours(23, 59, 59, 999));

//           dateFilter = {
//               date: { $gte: startOfDay, $lte: endOfDay }
//           };
//       }

//       const expenses = await Expense.find(dateFilter)
//           .skip((pageNumber - 1) * pageLimit)
//           .limit(pageLimit)
//           .sort({ date: -1 });

//       const totalExpenses = await Expense.countDocuments(dateFilter);
//       const totalPages = Math.ceil(totalExpenses / pageLimit);

//       res.status(200).json({ expenses, totalPages, currentPage: pageNumber, totalExpenses });
//   } catch (error) {
//       res.status(500).json({ message: "Server error", error: error.message });
//   }
// };


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