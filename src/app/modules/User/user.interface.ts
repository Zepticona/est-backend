export interface IUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: "admin" | "student" | "faculty";
  isDeleted: boolean;
  status: "in-progress" | "blocked";
}

export interface INewUser {
  role: string;
  password: string;
  id: string;
}
