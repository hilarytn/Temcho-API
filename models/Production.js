import mongoose from "mongoose";

const productionSchema = new mongoose.Schema(
  {
    quantity: { type: Number, required: true },
    date: { type: Date, required: true },
    shift: { type: [String], enum: ["morning", "afternoon", "night"], required: true },
    operator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    nylonRollsUsed: { type: Number, required: true }, // Track rolls of nylon used
    packingBagsUsed: { type: Number, required: true }, // Track number of packing bags used
    powerSource: { type: [String], enum: ["mains", "diesel"], required: true }, // Track power source
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Production", productionSchema);
