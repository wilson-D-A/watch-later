import type { Video } from "@/types/TagFilterSectionData";
import { useMemo } from "react";
import { useFilterController } from "../controllers/useFilterController";
import { useTagController } from "../controllers/useTagController";
import useVideos from "../services/useGetVideos";

function useVideoDetails() {
  const { getTag } = useTagController();
  const { getCategory, search } = useFilterController();
  const query = useVideos();

  const data = query.data;

  const categoryCounts: Record<string, number> = useMemo(
    () =>
      Array.isArray(data)
        ? data.reduce((acc: Record<string, number>, item: Video) => {
            acc[item.category] = (acc[item.category] || 0) + 1;

            return acc;
          }, {})
        : {},
    [data],
  );

  const filteredTag: Video[] = useMemo(
    () =>
      data?.filter(
        (video: Video) => getCategory === "" || video.category === getCategory,
      ) || [],
    [data, getCategory],
  );

  const allVideos: Video[] =
    filteredTag.filter((video: Video) =>
      search
        ? video.title.toLowerCase().includes(search.toLowerCase()) ||
          video.channelName.toLowerCase().includes(search.toLowerCase())
        : true,
    ) || [];
  const firstSuggestion: string | undefined = useMemo(() => {
    if (!search) return undefined;

    return (
      filteredTag
        .find((item: Video) =>
          item.title.toLowerCase().startsWith(search.toLowerCase()),
        )
        ?.title?.slice(search.length)
        .toLowerCase() || undefined
    );
  }, [filteredTag, search]);

  const ConceptList = [
    ...new Set(allVideos.map((video) => video.tags[0].name)),
  ].toSorted((a, b) => a.localeCompare(b));

  const filteredVideos =
    allVideos?.filter((video) =>
      getTag.length > 0
        ? video.tags.some((subcategory) => getTag.includes(subcategory.name))
        : true,
    ) || [];

  return {
    ...query,
    filteredTag,
    allVideos,
    firstSuggestion,
    ConceptList,
    categoryCounts,
    filteredVideos,
  };
}
function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return match ? match[1] : null;
}

export { getYouTubeId, useVideoDetails };
