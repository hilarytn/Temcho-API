import mongoose from "mongoose";

const operatorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dateJoined: { type: Date, default: Date.now },
    role: { type: String, default: "Operator" },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Operator", operatorSchema);
