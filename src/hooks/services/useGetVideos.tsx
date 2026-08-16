import { useInfiniteQuery } from "@tanstack/react-query";
import {
  getVideos,
  VideosCursorResponse,
  VideoSortBy,
  VideoSortOrder,
} from "../../data/getVideos";

function useVideos(
  category?: string,
  tags?: string[],
  sortBy: VideoSortBy = "title",
  sortOrder: VideoSortOrder = "asc",
) {
  return useInfiniteQuery({
    queryKey: ["videos", category, tags ?? [], sortBy, sortOrder],
    initialPageParam: null,
    queryFn: ({ pageParam }) =>
      getVideos({
        pageParam,
        category,
        tag: tags,
        sortBy,
        sortOrder,
      }),
    getNextPageParam: (lastPage: VideosCursorResponse) => {
      if (!lastPage.has_next_page || lastPage.next_cursor == null) {
        return undefined;
      }

      return lastPage.next_cursor;
    },
  });
}

export default useVideos;
