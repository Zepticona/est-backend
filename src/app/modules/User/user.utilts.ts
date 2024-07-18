import { User } from "./user.model";

const findLastModerator = async () => {
  const lastModerator = await User.findOne({ role: "moderator" }, { id: 1 })
    .sort({ createdAt: -1 })
    .lean();

  return lastModerator?.id ? lastModerator.id : undefined;
};

export const generateModeratorID = async () => {
  const modNumber = "0001";

  const lastModID = await findLastModerator();
  const newModID = lastModID
    ? (Number(lastModID.split("-")[1]) + 1).toString().padStart(4, "0")
    : modNumber;

  return "M-" + newModID;
};
