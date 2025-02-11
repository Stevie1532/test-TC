import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messages: [
      {
        senderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    isActive: { type: Boolean, default: true },
    outOfRange: {
      user1: { type: Boolean, default: false },
      user2: { type: Boolean, default: false },
    },
    friendshipRequested: { type: Boolean, default: false },
    friendshipStatus: {
      type: String,
      enum: ["pending", "accepted", "denied"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
