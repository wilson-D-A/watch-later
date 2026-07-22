import axios from "axios";

const api = axios.create({
  // Use same-origin path so browser requests are proxied by Next.js.
  baseURL: process.env.NEXT_PUBLIC_API_BASE_PATH || "/backend",
  timeout: 10000,
});

export const getVideos = async ({ pageParam }: { pageParam: number }) => {
  return await api
    .get("/videos", { params: { cursor: pageParam } })
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
