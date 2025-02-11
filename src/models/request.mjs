import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "denied"],
    default: "pending",
  },
  timestamp: { type: Date, default: Date.now },
  denials: { type: Number, default: 0 },
});

export default mongoose.model("Request", requestSchema);
