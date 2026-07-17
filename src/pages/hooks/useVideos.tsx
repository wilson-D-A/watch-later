import { useQuery } from "@tanstack/react-query";
import { getVideos } from "../api/getVideos";

function useVideos() {
  return useQuery({ queryKey: ["videos"], queryFn: getVideos });
}

export default useVideos;
