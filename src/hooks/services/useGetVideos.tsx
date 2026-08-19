import { Video } from "@/types/TagFilterSectionData";
import { useInfiniteQuery } from "@tanstack/react-query";
<<<<<<< HEAD
import { getVideos } from "../../data/getVideos";
=======
import {
  getVideos,
  VideoSortBy,
  VideoSortOrder,
  VideosPageParam,
} from "../../data/getVideos";
>>>>>>> sortedByVideos

function useVideos(category?: string, tags?: string[]) {
  return useInfiniteQuery({
<<<<<<< HEAD
    queryKey: ["videos", category],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      getVideos({ pageParam }, category || "", tags || []),
    getNextPageParam: (lastPage: Video[]) => {
      return lastPage.length > 0 ? lastPage[lastPage.length - 1].id : null;
=======
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
>>>>>>> sortedByVideos
    },
  });
}

export default useVideos;
