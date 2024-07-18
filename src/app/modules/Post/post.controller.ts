import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createPostIntoDB } from "./post.service";

const createPost = catchAsync(async (req, res, next) => {
  const post = { body: req.body, files: req?.files };
  const uploadedPost = await createPostIntoDB(post);

  sendResponse(res, {
    data: uploadedPost,
    success: true,
    message: "Post uploaded",
    statusCode: httpStatus.OK,
  });
});

export default createPost;
