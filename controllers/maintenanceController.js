import Maintenance from "../models/Maintenance.js";

// Maintenance Controllers
export const createMaintenance = async (req, res) => {
    try {
      const { machineName, maintenanceDate, description, cost } = req.body;
      const performedBy = req.user.id;
  
      const newMaintenance = new Maintenance({
        machineName,
        maintenanceDate,
        description,
        cost,
        performedBy,
      });
  
      await newMaintenance.save();
      res.status(201).json(newMaintenance);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  export const getMaintenances = async (req, res) => {
    try {
      const maintenances = await Maintenance.find();
      res.status(200).json(maintenances);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  export const getMaintenanceById = async (req, res) => {
    try {
      const maintenance = await Maintenance.findById(req.params.id);
      if (!maintenance) return res.status(404).json({ message: "Maintenance record not found" });
      res.status(200).json(maintenance);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  export const updateMaintenance = async (req, res) => {
    try {
      const updatedMaintenance = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedMaintenance) return res.status(404).json({ message: "Maintenance record not found" });
      res.status(200).json(updatedMaintenance);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  export const deleteMaintenance = async (req, res) => {
    try {
      await Maintenance.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Maintenance record deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  