import { v2 as cloudinary } from "cloudinary";
import { AppError } from "../../errors/AppError";
import httpStatus from "http-status";

export const uploadImageToCloudinary = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, (error, result) => {
      if (error) reject(error);
      else {
        if (result) {
          resolve(result.secure_url);
        } else {
          throw new AppError(
            httpStatus.BAD_REQUEST,
            "Cloudinary result undefined."
          );
        }
      }
    });
  });
};
