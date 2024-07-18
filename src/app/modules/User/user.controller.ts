/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createModerator = catchAsync(async (req, res, next) => {
  const { moderator } = req.body;
  // will call service function to send this data
  const result = await UserService.createModeratorIntoDB(moderator);

  sendResponse(res, {
    success: true,
    message: "User & Moderator created succesfully",
    data: result,
    statusCode: httpStatus.OK,
  });
});

const UserControllers = {
  createModerator,
};

export default UserControllers;
