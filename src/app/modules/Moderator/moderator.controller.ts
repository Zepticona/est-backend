/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import moderatorService from "./moderator.service";

const approvePost = catchAsync(async (req, res, next) => {
  const approvedPost = await moderatorService.approvePost(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: approvedPost,
    message: "Post approved!",
  });
});

const deletePost = catchAsync(async (req, res, next) => {
  const deletedPost = await moderatorService.deletePost(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: deletedPost,
    message: "Post deleted!",
  });
});

const resolvePost = catchAsync(async (req, res, next) => {
  const resolvedPost = await moderatorService.resolvePost(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: resolvedPost,
    message: "Post deleted!",
  });
});

export default { approvePost, deletePost, resolvePost };
