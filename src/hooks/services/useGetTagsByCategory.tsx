import { getTagsByCategory } from "@/data/getVideos";
import { useQuery } from "@tanstack/react-query";

function useGetTagsByCategory(category: string) {
  return useQuery({
    queryKey: ["tags-by-category", category],
    queryFn: () => getTagsByCategory(category),
  });
}

export default useGetTagsByCategory;
