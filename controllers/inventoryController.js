// Inventory Controllers
export const addInventory = async (req, res) => {
    try {
      const { itemName, quantity, unit } = req.body;
      const addedBy = req.user.id;
  
      const newItem = new Inventory({ itemName, quantity, unit, addedBy });
      await newItem.save();
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  export const getInventory = async (req, res) => {
    try {
      const inventory = await Inventory.find();
      res.status(200).json(inventory);
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
  