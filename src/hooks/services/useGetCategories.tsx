import { getCategories, type CategoriesResponse } from "@/data/getVideos";
import { useQuery } from "@tanstack/react-query";

function useGetCategories() {
  return useQuery<CategoriesResponse>({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
}

export default useGetCategories;
