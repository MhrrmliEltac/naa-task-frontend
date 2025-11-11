export interface Data {
  id: number;
  photo: string;
  title: string;
  description: string;
  type: "News" | "Announcement";
  date: string;
  status: boolean;
  visibility: boolean;
  author: string;
  publishStatus?: "Publish" | "Draft";
  galleryImage: string[];
  slug?: string;
}
