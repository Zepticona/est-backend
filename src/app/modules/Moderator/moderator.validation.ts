import { z } from "zod";

export const moderatorSchema = z.object({
  username: z.string().trim().optional(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  roles: z.string().optional(),
});

export const validateModerator = (data: unknown) => {
  return moderatorSchema.parse(data);
};
