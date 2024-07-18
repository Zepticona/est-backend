import { INewUser } from "./user.interface";
import { User } from "./user.model";
import { generateModeratorID } from "./user.utilts";
import mongoose from "mongoose";
import { AppError } from "../../errors/AppError";
import httpStatus from "http-status";
import { IModerator } from "../Moderator/moderator.interface";
import { Moderator } from "../Moderator/moderator.model";

const createModeratorIntoDB = async (moderator: IModerator) => {
  const user: Partial<INewUser> = {};
  user.role = "moderator";
  user.password = moderator.password;
  user.id = await generateModeratorID();

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    //
    const newUser = await User.create([user], { session: session });

    if (!newUser.length)
      throw new AppError(httpStatus.BAD_REQUEST, "Could not create user");
    moderator.id = newUser[0].id;
    moderator.user = newUser[0]._id;
    const newModerator = await Moderator.create([moderator], {
      session: session,
    });

    if (!newModerator.length)
      throw new AppError(httpStatus.BAD_REQUEST, "Could not create moderator!");

    await session.commitTransaction();
    await session.endSession();

    return newModerator;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Could not create new moderaor!"
    );
  }
};

export const UserService = {
  createModeratorIntoDB,
};
