

export const createProductionRecord = async (req, res) => {
    try {
      const { quantity, date, shift, operator, nylonRollsUsed, packingBagsUsed, powerSource } = req.body;
  
      const productionRecord = await Production.create({
        quantity,
        date,
        shift,
        operator,
        nylonRollsUsed,
        packingBagsUsed,
        powerSource,
      });
  
      res.status(201).json({ message: "Production record created", productionRecord });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  