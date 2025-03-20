import mongoose from "mongoose";

const salesSchema = new mongoose.Schema(
  {
    date: { type: String, required: true }, // Format: YYYY-MM-DD
    serialNumber: { type: Number, required: true, unique: true }, // S/NO
    customer: { type: String, required: true },
    quantity: { type: Number, required: true }, // Quantity in bags
    rate: { type: Number, required: true }, // Rate per bag (in Naira)
    value: { type: Number, required: true }, // Computed Value (Quantity * Rate)
    amountReceived: { type: Number, required: true }, // Amount actually received
    paymentMethod: { type: String, enum: ["cash", "transfer", "credit"], required: true },
    remarks: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Sales", salesSchema);
