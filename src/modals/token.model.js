import mogoose, { Schema } from "mongoose";

const tokenSchema = new Schema(
  {
    access: {
      type: String,
      required: true,
      trim: true,
    },
    refresh: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mogoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Token = mogoose.model("Token", tokenSchema);
export default Token;
