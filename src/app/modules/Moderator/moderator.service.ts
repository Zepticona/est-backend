import Post from "../Post/post.model";

const approvePost = async (id: string) => {
  const result = await Post.updateOne(
    { _id: id, type: "help-post" },
    { status: "approved" }
  );

  return result;
};

const deletePost = async (id: string) => {
  const result = await Post.updateOne({ _id: id }, { status: "deleted" });

  return result;
};

const resolvePost = async (id: string) => {
  const result = await Post.updateOne({ _id: id }, { status: "resolved" });

  return result;
};

export default {
  approvePost,
  deletePost,
  resolvePost,
};
