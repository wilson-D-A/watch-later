import type { Video } from "@/types/TagFilterSectionData";
import { useEffect, useMemo } from "react";
import { useFilterController } from "../controllers/useFilterController";
import { useTagController } from "../controllers/useTagController";
import useGetTagsByCategory from "../services/useGetTagsByCategory";
import useVideos from "../services/useGetVideos";

function useVideoDetails() {
  const { getTag } = useTagController();
  const { getCategory, search } = useFilterController();
  let nextCursor: number | null = 0;
  const query = useVideos(getCategory);
  const data = query.data;
  const page = data?.pages.map((page) => page).flat() || [];
  const { data: tagsByCategory } = useGetTagsByCategory(getCategory);

  const tagTypes: { concept: string[]; tool: string[]; topic: string[] } =
    useMemo(() => {
      const conceptTags: Set<string> = new Set<string>();
      const toolTags: Set<string> = new Set<string>();
      const topicTags: Set<string> = new Set<string>();

      if (tagsByCategory) {
        tagsByCategory.forEach((tag: { type: string; name: string }) => {
          if (tag.type === "concept") {
            conceptTags.add(tag.name);
          } else if (tag.type === "tool") {
            toolTags.add(tag.name);
          } else if (tag.type === "topic") {
            topicTags.add(tag.name);
          }
        });
      }

      return {
        concept: Array.from(conceptTags).sort(),
        tool: Array.from(toolTags).sort(),
        topic: Array.from(topicTags).sort(),
      };
    }, [tagsByCategory]);

  const categoryCounts: Record<string, number> = useMemo(
    () =>
      Array.isArray(page)
        ? page.reduce((acc: Record<string, number>, item: Video) => {
            acc[item.category] = (acc[item.category] || 0) + 1;

            return acc;
          }, {})
        : {},
    [page],
  );

  const filteredTag: Video[] = useMemo(
    () =>
      page.filter(
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

  const filteredVideos = useMemo(() => {
    return (
      allVideos?.filter((video) => {
        return getTag.length > 0
          ? video.tags.some((tag) => {
              return getTag.includes(tag.name);
            })
          : true;
      }) || []
    );
  }, [allVideos, getTag]);

  // fetch all pages when tag filter is active so client-side filtering has full data
  useEffect(() => {
    if (getTag.length > 0 && query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  }, [
    getTag,
    query.hasNextPage,
    query.isFetchingNextPage,
    query.fetchNextPage,
  ]);

  return {
    ...query,
    filteredTag,
    categoryCounts,
    filteredVideos,
    tagTypes,
  };
}
function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return match ? match[1] : null;
}

export { getYouTubeId, useVideoDetails };
