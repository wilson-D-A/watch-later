import type { Video } from "@/pages/index";

export function getUniqueTags(videos: Video[], index: number) {
  return [...new Set(videos.map((v) => v.tags[index].name))].sort();
}
export function getVisibleTags(
  uniqueTags: string[],
  isMore: boolean,
  collapsedCount: number,
) {
  return isMore ? uniqueTags : uniqueTags.slice(0, collapsedCount);
}
