import { Schema, model } from "mongoose";
import { IModerator } from "./moderator.interface";

const ModeratorSchema = new Schema<IModerator>(
  {
    id: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    username: { type: String },
    email: { type: String, required: true },
    roles: { type: String, required: true, default: "moderator" },
  },
  {
    timestamps: true,
  }
);

export const Moderator = model<IModerator>("Moderator", ModeratorSchema);
