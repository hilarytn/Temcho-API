import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
    {
      machineName: { type: String, required: true },
      maintenanceDate: { type: String, required: true },
      description: { type: String, required: true },
      cost: { type: Number, required: true },
      performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
  );
  
  export default mongoose.model("Maintenance", maintenanceSchema);