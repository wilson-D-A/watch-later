import { Video } from "@/types/TagFilterSectionData";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getVideos } from "../../data/getVideos";

function useVideos(category?: string) {
  return useInfiniteQuery({
    queryKey: ["videos", category],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getVideos({ pageParam }, category || ""),
    getNextPageParam: (lastPage: Video[]) => {
      return lastPage.length > 0 ? lastPage[lastPage.length - 1].id : null;
    },
  });
}

export default useVideos;
