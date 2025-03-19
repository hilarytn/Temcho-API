import mongoose from "mongoose";

const productionSchema = new mongoose.Schema(
  {
    quantity: { type: Number, required: true },
    date: { type: Date, required: true },
    shift: { type: [String], enum: ["morning", "afternoon", "night"], required: true },
    operator: [{ type: mongoose.Schema.Types.ObjectId, ref: "Operator", required: false }],
    nylonRollsUsed: { type: Number, required: true },
    packingBagsUsed: { type: Number, required: true },
    powerSource: { type: [String], enum: ["mains", "diesel"], required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Production", productionSchema);
