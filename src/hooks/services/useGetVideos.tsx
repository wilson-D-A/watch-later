import { Video } from "@/types/TagFilterSectionData";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getVideos } from "../../data/getVideos";

function useVideos() {
  return useInfiniteQuery({
    queryKey: ["videos"],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getVideos({ pageParam }),
    getNextPageParam: (lastPage: Video[]) => {
      return lastPage.length > 0 ? lastPage[lastPage.length - 1].id : null;
    },
  });
}

export default useVideos;
