import Sales from "../models/Sales.js";
import moment from "moment";

// Create a new sales transaction
export const createSale = async (req, res) => {
  try {
    const { date, customer, quantity, rate, amountReceived, paymentMethod, remarks } = req.body;

    // Ensure the user ID is included from the authenticated request
    const userId = req.user.id;

    const value = quantity * rate;
    const outstandingBalance = value - amountReceived;

    // Get the latest sale for the given date and find the last serial number
    const lastSale = await Sales.findOne({ date }).sort({ serialNumber: -1 });

    // Determine the next serial number
    const serialNumber = lastSale ? lastSale.serialNumber + 1 : 1;

    const newSale = new Sales({
      date,
      serialNumber,
      customer,
      quantity,
      rate,
      value,
      amountReceived,
      outstandingBalance,
      paymentMethod,
      remarks,
      user: userId
    });

    await newSale.save();
    res.status(201).json(newSale);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Get all sales transactions
export const getAllSales = async (req, res) => {
  try {
    const sales = await Sales.find().sort({ date: -1, serialNumber: 1 });
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all sales for a specific date
export const getSalesByDate = async (req, res) => {
    try {
      const { date } = req.query;
      if (!date) {
        return res.status(400).json({ message: "Date query parameter is required" });
      }
  
      const sales = await Sales.find({ date }).sort({ serialNumber: 1 });
  
      if (sales.length === 0) {
        return res.status(404).json({ message: "No sales found for this date" });
      }
  
      res.status(200).json(sales);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  

// Get a single sales transaction by ID
export const getSaleById = async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: "Sales transaction not found" });
    }
    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update a sales transaction
export const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, customer, quantity, rate, amountReceived, paymentMethod, remarks } = req.body;

    const sale = await Sales.findById(id);
    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    // If the date is changing, recalculate serial number
    if (date && date !== sale.date) {
      // Get the highest serial number for the new date
      const lastSale = await Sales.findOne({ date }).sort({ serialNumber: -1 });
      const newSerialNumber = lastSale ? lastSale.serialNumber + 1 : 1;

      sale.serialNumber = newSerialNumber;
      sale.date = date;
    }

    // Update other fields
    sale.customer = customer ?? sale.customer;
    sale.quantity = quantity ?? sale.quantity;
    sale.rate = rate ?? sale.rate;
    sale.value = quantity * rate;
    sale.amountReceived = amountReceived ?? sale.amountReceived;
    sale.paymentMethod = paymentMethod ?? sale.paymentMethod;
    sale.remarks = remarks ?? sale.remarks;

    await sale.save();

    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Delete a sales transaction
export const deleteSale = async (req, res) => {
  try {
    const deletedSale = await Sales.findByIdAndDelete(req.params.id);
    if (!deletedSale) {
      return res.status(404).json({ message: "Sales transaction not found" });
    }
    res.status(200).json({ message: "Sales transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
