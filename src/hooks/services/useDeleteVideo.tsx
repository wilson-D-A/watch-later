import { deleteVideo } from "@/data/getVideos";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function UseDeleteVideo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteVideo(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });
}

export default UseDeleteVideo;
