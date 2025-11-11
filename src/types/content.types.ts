import { StatusValueType } from "./dropdown.types";

export type PublishStatusType = "Publish" | "Draft";

export interface Content {
  _id: string;
  title: string;
  slug: string;
  category: string;
  coverImage?: File | string | null;
  htmlContent: string;
  activeLang: string;
  galleryImages?: (File | string)[] | null;
  author: string;
  publishStatus: PublishStatusType;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

export interface CreateContentDto {
  title: string;
  slug: string;
  category: string;
  coverImage?: File | null;
  htmlContent: string;
  activeLang: string;
  galleryImages?: (File | string)[] | null;
  author: string;
  publishStatus: PublishStatusType;
}

export interface ContentFilters {
  page?: number;
  limit?: number;
  category?: string;
  publishStatus?: string;
  activeLang?: string;
  active?: Omit<"All Status", StatusValueType>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
