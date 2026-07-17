import { useMemo } from "react";
import type { Video } from "../index";
import useVideos from "./useVideos";

function VideoDetails(getCategory: string, search: string, getTag: string[]) {
  const query = useVideos();

  const categoryCounts: Record<string, number> = {};
  const data = query.data;
  if (Array.isArray(data)) {
    data.forEach((item: Video) => {
      categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
    });
  }
  const filteredTag =
    data?.filter(
      (video: Video) => getCategory === "" || video.category === getCategory,
    ) || [];

  const allVideos: Video[] =
    filteredTag.filter(
      (video: Video) =>
        video.title.toLowerCase().includes(search.toLowerCase()) ||
        video.channelName.toLowerCase().includes(search.toLowerCase()),
    ) || [];
  const firstSuggestion: Video | undefined = useMemo(() => {
    if (!search) return undefined;

    return (
      filteredTag.find((item: Video) =>
        item.title.toLowerCase().startsWith(search.toLowerCase()),
      ) || undefined
    );
  }, [search]);

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

export { getYouTubeId, VideoDetails };
