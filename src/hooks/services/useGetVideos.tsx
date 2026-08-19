import { useInfiniteQuery } from "@tanstack/react-query";
import {
  getVideos,
  VideoSortBy,
  VideoSortOrder,
  VideosPageParam,
} from "../../data/getVideos";

function useVideos(
  category?: string,
  tags?: string[],
  sortBy: VideoSortBy = "title",
  sortOrder: VideoSortOrder = "asc",
) {
  return useInfiniteQuery({
    queryKey: ["videos", category, tags ?? [], sortBy, sortOrder],
    initialPageParam: null as VideosPageParam | null,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    queryFn: ({ pageParam }) =>
      getVideos({
        pageParam,
        category,
        tag: tags,
        sortBy,
        sortOrder,
      }),

    getNextPageParam: (lastPage) => {
      if (!lastPage.has_next_page || lastPage.next_cursor == null) {
        return undefined;
      }
      return lastPage.next_cursor;
    },
  });
}

export default useVideos;
