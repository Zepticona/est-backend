import { Types } from "mongoose";

export interface IModerator {
  id: string;
  user: Types.ObjectId;
  username?: string;
  password: string;
  email: string;
  roles: "admin" | "moderator" | "visitor";
}
