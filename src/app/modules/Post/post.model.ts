import { Schema, model } from "mongoose";
import { IPost } from "./post.interface";
const postSchema = new Schema<IPost>(
  {
    body: String,
    title: String,
    tags: Array,
    imgUrls: Array,
    vidUrls: Array,
    contactNo: String,
    status: ["approved", "deleted", "waiting-approval"],
  },
  {
    timestamps: true,
  }
);

const Post = model<IPost>("Post", postSchema);

export default Post;
