import type {
  Content,
  ContentFilters,
  PaginatedResponse,
} from "../types/content.types";
import { apiClient } from "./client";

export const contentApi = {
  // get all Content
  getContents: async (
    filters?: ContentFilters
  ): Promise<PaginatedResponse<Content>> => {
    const { data } = await apiClient.get("/content", { params: filters });
    return data;
  },

  // Get single content by ID
  getContentById: async (id: string): Promise<Content> => {
    const { data } = await apiClient.get(`/content/${id}`);
    return data.data;
  },

  // Create content
  createContent: async (content: FormData): Promise<Content> => {
    const { data } = await apiClient.post("/content", content);
    return data.data;
  },

  // Update content
  updateContent: async (content: FormData): Promise<Content> => {
    const { data } = await apiClient.put(
      `/content/${content.get("id")}`,
      content,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return data.data;
  },

  // Delete content
  deleteContent: async (id: string): Promise<void> => {
    await apiClient.delete(`/content/${id}`);
  },

  // Update publish status
  updatePublishStatus: async (
    id: string,
    publishStatus: string
  ): Promise<Content> => {
    const { data } = await apiClient.patch(`/content/${id}/status`, {
      publishStatus,
    });
    return data.data;
  },
};
