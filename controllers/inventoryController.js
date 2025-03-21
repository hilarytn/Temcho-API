import Inventory from '../models/Inventory.js'

export const addInventory = async (req, res) => {
    try {
      const { itemName, quantity, unit } = req.body;
      const addedBy = req.user.id;
  
      let inventoryItem = await Inventory.findOne({ itemName });
  
      if (inventoryItem) {
        // Update the existing item's quantity
        inventoryItem.quantity += quantity;
        await inventoryItem.save();
        return res.status(200).json(inventoryItem);
      } else {
        // Create a new item if it doesn't exist
        inventoryItem = new Inventory({ itemName, quantity, unit, addedBy });
        await inventoryItem.save();
        return res.status(201).json(inventoryItem);
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  
  export const getInventory = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const inventory = await Inventory.find()
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
      const total = await Inventory.countDocuments();
  
      res.status(200).json({
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        inventory,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  export const getInventoryById = async (req, res) => {
    try {
      const inventoryItem = await Inventory.findById(req.params.id);
      if (!inventoryItem) return res.status(404).json({ message: "Inventory item not found" });
      res.status(200).json(inventoryItem);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  export const updateInventory = async (req, res) => {
    try {
      const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedItem) return res.status(404).json({ message: "Inventory item not found" });
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  
  export const deleteInventory = async (req, res) => {
    try {
      await Inventory.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Inventory item deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };