import mongoose from "mongoose";

const salesSchema = new mongoose.Schema(
  {
    date: { type: String, required: true }, // Format: YYYY-MM-DD
    serialNumber: { type: Number, required: true }, // S/NO
    customer: { type: String, required: true },
    quantity: { type: Number, required: true }, // Quantity in bags
    rate: { type: Number, required: true }, // Rate per bag (in Naira)
    value: { type: Number, required: true }, // Computed Value (Quantity * Rate)
    amountReceived: { type: Number, required: true }, // Amount actually received
    paymentMethod: { type: String, enum: ["cash", "transfer", "credit"], required: true },
    outstandingBalance: { type: Number, required: true, default: 0 }, // Value - Amount Received
    remarks: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

// Create a compound index to enforce uniqueness of serialNumber within each date
salesSchema.index({ date: 1, serialNumber: 1 }, { unique: true });

export default mongoose.model("Sales", salesSchema);
