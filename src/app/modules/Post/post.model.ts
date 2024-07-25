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
    status: ["approved", "deleted", "waiting-approval", "resolved"],
    type: ["archive", "help-post"],
  },
  {
    timestamps: true,
  }
);

postSchema.pre("find", function (next) {
  this.find({ status: { $ne: "deleted" } });

  next();
});

const Post = model<IPost>("Post", postSchema);

export default Post;
