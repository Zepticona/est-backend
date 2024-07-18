import { v2 as cloudinary } from "cloudinary";

export const uploadImageToCloudinary = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, (error, result) => {
      if (error) reject(error);
      else resolve(result.secure_url);
    });
  });
};
