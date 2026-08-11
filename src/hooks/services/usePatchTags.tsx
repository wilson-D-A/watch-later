import { useMutation, useQueryClient } from "@tanstack/react-query";

import { patchTags } from "../../data/getVideos";
function usePatchTags() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, tags }: { id: number; tags: Record<string, string> }) =>
      patchTags(id, tags),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });
}

export default usePatchTags;
