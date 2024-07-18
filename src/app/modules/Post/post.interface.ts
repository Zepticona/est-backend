export interface IPost {
  body: string;
  title: string;
  tags: string[];
  imgUrls: string[];
  vidUrls: string[];
  contactNo: string;
  status: "waiting-approval" | "approved" | "deleted";
}
