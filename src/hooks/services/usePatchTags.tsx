import { useMutation } from "@tanstack/react-query";
import { patchTags } from "../../data/getVideos";

function patchTag() {
  return useMutation({
    mutationFn: ({
      id,
      tags,
    }: {
      id: number;
      tags: Record<string, string>[];
    }) => patchTags(id, tags),
  });
}

export default patchTag;
