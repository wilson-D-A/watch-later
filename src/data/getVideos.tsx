import type { Video } from "@/types/TagFilterSectionData";
import axios from "axios";

export interface CategoriesResponse {
  categories: Record<string, string | number>;
  all_videos: number;
}

export interface VideosCursorResponse {
  items: Video[];
  next_cursor: {
    cursor_value: string;
    cursor_id: number;
  } | null;
  has_next_page: boolean;
}

export type VideoSortBy = "title" | "channelName";
export type VideoSortOrder = "asc" | "desc";

export interface VideosPageParam {
  cursor_value: string | null;
  cursor_id: number | null;
}

const api = axios.create({
  // Use same-origin path so browser requests are proxied by Next.js.
  baseURL: process.env.NEXT_PUBLIC_API_BASE_PATH || "/backend",
  timeout: 10000,
});

export const getCategories = async () => {
  return await api
    .get<CategoriesResponse>("/categories")
    .then((res) => res.data)
    .catch((error) => {
      console.error("getCategories failed", error);
      return { categories: {}, all_videos: 0 };
    });
};

export const getTagsByCategory = async (category: string) => {
  return await api
    .get<{ name: string; type: string }[]>("/tags_by_category", {
      params: { category: category },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("getTagsByCategory failed", error);
      return [];
    });
};

export const getVideos = async ({
  pageParam,
  category,
  tag,
  sortBy = "channelName",
  sortOrder = "desc",
}: {
  pageParam: VideosPageParam | null;
  category?: string;
  tag?: string[];
  sortBy?: VideoSortBy;
  sortOrder?: VideoSortOrder;
}) => {
  return await api
    .get<VideosCursorResponse>("/videos", {
      params: {
        cursor_value: pageParam?.cursor_value ?? null,
        cursor_id: pageParam?.cursor_id ?? null,
        category: category || null,
        tag: tag?.length ? tag : null,
        sort_by: sortBy,
        sort_order: sortOrder,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error("getVideos failed", error);
      return {
        items: [],
        next_cursor: null,
        has_next_page: false,
      };
    });
};

export const patchTags = async (id: number, tags: Record<string, string>) => {
  return await api
    .patch(`/videos/${id}`, tags)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("patchTags failed", error);
      return null;
    });
};

export const deleteVideo = async (id: number) => {
  return await api
    .delete(`/videos/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("deleteVideo failed", error);
      return null;
    });
};
