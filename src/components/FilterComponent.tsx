import * as React from "react";
import type { Video } from "../pages/index";

interface IFilterProps {
  allVideos: Video[];
  getTags: string;
  setTags: React.Dispatch<React.SetStateAction<string>>;
  handleSubcategoryClick: (subcategory: string) => void;

  setIsMoreConcepts: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMoreTools: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMoreTopics: React.Dispatch<React.SetStateAction<boolean>>;
  isMoreTools: boolean;
  isMoreTopics: boolean;
  ConceptList: string[];
  isMoreConcepts: boolean;
}

const Filter: React.FunctionComponent<IFilterProps> = ({
  allVideos,
  getTags,
  handleSubcategoryClick,
  setIsMoreConcepts,
  ConceptList,
  isMoreConcepts,
  setIsMoreTools,
  setIsMoreTopics,
  isMoreTools,
  isMoreTopics,
}) => {
  const [collapsedCount, setCollapsedCount] = React.useState(6);

  const getCollapsedCountFromWidth = (width: number) => {
    if (width < 899) return 4;
    if (width < 1284) return 5;
    if (width < 1865) return 9;
    return 8;
  };
  React.useEffect(() => {
    const update = () =>
      setCollapsedCount(getCollapsedCountFromWidth(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const visibleConcepts = isMoreConcepts
    ? ConceptList
    : ConceptList?.slice(0, collapsedCount);

  const tools = [
    ...new Set(allVideos?.map((video) => video.tags[1].name)),
  ].sort((a, b) => a.localeCompare(b));
  const visibleTools = isMoreTools
    ? tools
    : tools?.slice(0, collapsedCount + 3);
  const topics = [
    ...new Set(allVideos?.map((video) => video.tags[2].name)),
  ].sort((a, b) => a.localeCompare(b));
  const visibleTopics = isMoreTopics
    ? topics
    : topics?.slice(0, collapsedCount + 3);
  return (
    <>
      {getTags && (
        <div className="border-border h-auto w-auto grow rounded border-2 pb-2 sm:grow-0">
          <div
            className={`mx-2 mt-2 flex flex-col gap-2 overflow-hidden sm:flex-row sm:flex-wrap`}
          >
            <h2>concept</h2>
            {visibleConcepts?.map((concept, index) => (
              <span
                onClick={() => handleSubcategoryClick(concept)}
                className={`${getTags.includes(concept) ? "bg-concept text-zinc-200 inset-ring-[#aad97d]" : "inset-ring-border"} h-auto w-auto cursor-pointer rounded px-1 py-1 text-zinc-400 inset-ring-1`}
                key={index}
              >
                {concept}
              </span>
            ))}

            <span
              onClick={() => setIsMoreConcepts(!isMoreConcepts)}
              className={`${isMoreConcepts ? "bg-accent text-zinc-900" : "bg-concept text-zinc-200 inset-ring-[#aad97d]"} hover:bg-accent/50 ml-2 cursor-pointer rounded px-2 py-1 inset-ring-1 hover:text-zinc-200`}
            >
              {isMoreConcepts ? "less" : "more"}
            </span>
          </div>
          <div
            className={`mx-2 mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap`}
          >
            <h2>tools</h2>
            {visibleTools?.map((tools, index) => (
              <span
                onClick={() => handleSubcategoryClick(tools)}
                className={`${getTags.includes(tools) ? "bg-tools text-zinc-200 ring-[#5a97d6]" : "ring-border"} h-auto w-auto cursor-pointer rounded px-1 py-1 text-zinc-400 ring-1`}
                key={index}
              >
                {tools}
              </span>
            ))}
            {visibleTools.length >= collapsedCount + 3 && (
              <span
                onClick={() => setIsMoreTools(!isMoreTools)}
                className={`${isMoreTools ? "border-tools bg-[#5a97d6] text-zinc-900" : "bg-tools text-zinc-200 ring-[#5a97d6]"} ml-2 cursor-pointer rounded px-2 py-1 text-zinc-400 ring-1 hover:text-zinc-200`}
              >
                {isMoreTools ? "less" : "more"}
              </span>
            )}
          </div>
          <div
            className={`mx-2 mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap`}
          >
            <h2>topic</h2>
            {visibleTopics?.map((topics, index) => (
              <span
                onClick={() => handleSubcategoryClick(topics)}
                className={`${getTags.includes(topics) ? "bg-topics text-zinc-200 ring-[#b7a1ff]" : "ring-border"} h-auto w-auto cursor-pointer rounded px-1 py-1 text-zinc-400 ring-1`}
                key={index}
              >
                {topics}
              </span>
            ))}
            {visibleTopics.length >= collapsedCount + 3 && (
              <span
                onClick={() => setIsMoreTopics(!isMoreTopics)}
                className={`${isMoreTopics ? "bg-[#b7a1ff] text-zinc-900 ring-[#b7a1ff]" : "bg-topics text-zinc-200 ring-[#b7a1ff]"} ml-2 cursor-pointer rounded px-2 py-1 ring-1 hover:text-zinc-200`}
              >
                {isMoreTopics ? "less" : "more"}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Filter;
