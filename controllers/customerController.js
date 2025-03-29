import Customer from "../models/Customer.js";

// Add New Customer
export const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const customer = new Customer({ name, email, phone, address });
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Get customer by ID
// @route GET /customers/:id
// @access Public or Private (depending on auth)
export const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Customer
export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Customer
export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
