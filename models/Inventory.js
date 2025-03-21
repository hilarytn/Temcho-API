import mongoose from "mongoose"

// Inventory Schema
const inventorySchema = new mongoose.Schema(
    {
      itemName: { type: String, required: true, unique: true },
      quantity: { type: Number, required: true },
      unit: { type: String, required: true },
      addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
  );
  
export default mongoose.model("Inventory", inventorySchema);