import axios from "axios";

export interface CategoriesResponse {
  categories: Record<string, string | number>;
  all_videos: number;
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

export const getVideos = async (
  { pageParam }: { pageParam: number },
  category: string,
  tags: string[] = [],
) => {
  return await api
    .get("/videos", {
      params: { cursor: pageParam, category: category, tags: tags },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error("getVideos failed", error);
      return [];
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
