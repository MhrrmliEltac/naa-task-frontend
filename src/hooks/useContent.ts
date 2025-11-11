import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { contentApi } from "../api/content.service";
import type {
  Content,
  ContentFilters,
  PaginatedResponse,
} from "../types/content.types";

export const contentKeys = {
  all: ["contents"] as const,
  lists: () => [...contentKeys.all, "list"] as const,
  list: (filters?: ContentFilters) =>
    [...contentKeys.lists(), filters] as const,
  details: () => [...contentKeys.all, "detail"] as const,
  detail: (id: string) => [...contentKeys.details(), id] as const,
  slug: (slug: string) => [...contentKeys.all, "slug", slug] as const,
};

// GET ALL CONTENTS
export const useContents = (
  filters?: ContentFilters,
  options?: UseQueryOptions<PaginatedResponse<Content>>
) => {
  return useQuery({
    queryKey: contentKeys.list(filters),
    queryFn: () => contentApi.getContents(filters),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// GET CONTENT BY ID
export const useContent = (id: string, options?: UseQueryOptions<Content>) => {
  return useQuery({
    queryKey: contentKeys.detail(id),
    queryFn: () => contentApi.getContentById(id),
    enabled: !!id,
    ...options,
  });
};

// CREATE CONTENT
export const useCreateContent = (
  options?: UseMutationOptions<Content, Error, FormData>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contentApi.createContent,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: contentKeys.lists() });

      queryClient.setQueryData(contentKeys.detail(data._id), data);
    },
    ...options,
  });
};

// UPDATE CONTENT
export const useUpdateContent = (
  options?: UseMutationOptions<Content, Error, FormData>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contentApi.updateContent,
    onSuccess: (data) => {
      queryClient.setQueryData(contentKeys.detail(data._id), data);

      queryClient.invalidateQueries({ queryKey: contentKeys.lists() });
    },
    ...options,
  });
};

// DELETE CONTENT
export const useDeleteContent = (
  options?: UseMutationOptions<
    void,
    Error,
    string,
    { filters?: ContentFilters }
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contentApi.deleteContent,
    onSuccess: (_, id, context) => {
      queryClient.removeQueries({ queryKey: contentKeys.detail(id) });

      if (context?.filters) {
        queryClient.setQueryData<PaginatedResponse<Content> | undefined>(
          contentKeys.list(context.filters),
          (oldData) => {
            if (!oldData) return oldData;
            console.log(oldData);
            return {
              ...oldData,
              data: oldData.data.filter((item) => item._id !== id),
            };
          }
        );
      }

      queryClient.invalidateQueries({ queryKey: contentKeys.lists() });
    },
    ...options,
  });
};

// UPDATE PUBLISH STATUS
export const useUpdatePublishStatus = (
  options?: UseMutationOptions<Content, Error, { id: string; status: string }>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => contentApi.updatePublishStatus(id, status),
    onSuccess: (data) => {
      queryClient.setQueryData(contentKeys.detail(data._id), data);
      queryClient.invalidateQueries({ queryKey: contentKeys.lists() });
    },
    ...options,
  });
};
