/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import postService from "./post.service";
import { Request } from "express";

const getPosts = catchAsync(async (req, res, next) => {
  const posts = await postService.getAllPostsFromDB(req.query);

  sendResponse(res, {
    data: posts,
    success: true,
    message: "Posts fetched",
    statusCode: httpStatus.OK,
  });
});

const createPost = catchAsync(async (req, res, next) => {
  const uploadedPost = await postService.createPostIntoDB(req);

  sendResponse(res, {
    data: uploadedPost,
    success: true,
    message: "Post uploaded",
    statusCode: httpStatus.OK,
  });
});

export default { createPost, getPosts };
