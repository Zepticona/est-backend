import mongoose from "mongoose";
import { AppError } from "../../errors/AppError";
import httpStatus from "http-status";
import Post from "./post.model";
import { uploadImageToCloudinary } from "./post.utils";
import QueryBuilder from "../../builder/QueryBuilder";

const createPostIntoDB = async (req: Request) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { body, title, tags, contactNo, status, resolved, type } = req.body;

    const imgUrls: string[] = [];
    const vidUrls: string[] = [];

    for (const file of req.files) {
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

const getAllPostsFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = ["body", "title", "tags"];
  const builtQuery = new QueryBuilder(Post.find(), query)
    .search(searchableFields)
    .filter()
    .paginate()
    .sort();
  const result = await builtQuery.modelQuery;

  return result;
};

export default {
  createPostIntoDB,
  getAllPostsFromDB,
};
