import Production from "../models/Production.js";

export const createProductionRecord = async (req, res) => {
    try {
      const { quantity, date, shift, operator, nylonRollsUsed, packingBagsUsed, powerSource } = req.body;
      const productionRecord = await Production.create({ 
        quantity, date, shift, operator, nylonRollsUsed, packingBagsUsed, powerSource 
    });
      res.status(201).json({ message: "Production record created", productionRecord });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  export const getAllProductionRecords = async (req, res) => {
    try {
      const records = await Production.find({ isDeleted: false }).populate("operator");
      res.status(200).json(records);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  export const getProductionRecordById = async (req, res) => {
    try {
      const record = await Production.findById(req.params.id).populate("operator");
      if (!record || record.isDeleted) {
        return res.status(404).json({ message: "Production record not found" });
      }
      res.status(200).json(record);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  export const updateProductionRecord = async (req, res) => {
    try {
      const { quantity, date, shift, operators, nylonRollsUsed, packingBagsUsed, powerSources } = req.body;
      const record = await Production.findByIdAndUpdate(req.params.id, { quantity, date, shift, operator, nylonRollsUsed, packingBagsUsed, powerSources }, { new: true }).populate("operators");
      res.status(200).json({ message: "Production record updated", record });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  export const deleteProductionRecord = async (req, res) => {
    try {
      const record = await Production.findById(req.params.id);
      if (!record) {
        return res.status(404).json({ message: "Production record not found" });
      }
      record.isDeleted = true;
      await record.save();
      res.status(200).json({ message: "Production record deleted" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

  // This is fotr development purpose...I will remove it once I am done testing
  // Delete all production records (for development/testing purposes)
export const deleteAllProduction = async (req, res) => {
    try {
      await Production.deleteMany({});
      res.status(200).json({ message: "All production records deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };  