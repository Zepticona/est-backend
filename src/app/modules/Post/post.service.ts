import mongoose from "mongoose";
import { AppError } from "../../errors/AppError";
import httpStatus from "http-status";
import Post from "./post.model";
import { uploadImageToCloudinary } from "./post.utils";

export const createPostIntoDB = async (post: Record<string, unknown>) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { body, title, tags, contactNo, status } = post.body;

    const imgUrls: string[] = [];
    const vidUrls: string[] = [];

    for (const file of post.files) {
      if (file.mimetype.startsWith("image")) {
        const imgUrl = await uploadImageToCloudinary(file.path);
        imgUrls.push(imgUrl);
      } else if (file.mimetype.startsWith("video")) {
        // Handle video upload similarly
        const vidUrl = await uploadImageToCloudinary(file.path);
        vidUrls.push(vidUrl);
      }
    }
    const newPost = await Post.create(
      [
        {
          body,
          title,
          tags,
          imgUrls,
          vidUrls,
          contactNo,
          status,
        },
      ],
      { session }
    );

    if (!newPost.length)
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "An error occured while creating the post."
      );

    await session.commitTransaction();
    session.endSession();

    return newPost;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to upload post!");
  }
};
