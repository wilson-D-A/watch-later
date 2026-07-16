import * as React from "react";
import type { Video } from "../index";

interface IMobileFilterProps {
  allVideos: Video[];
  getTags: string;
  setTags: React.Dispatch<React.SetStateAction<string>>;
  handleSubcategoryClick: (subcategory: string) => void;
  getSubcategory: string[];
  setSubcategory: React.Dispatch<React.SetStateAction<string[]>>;
  setIsMoreConcepts: React.Dispatch<React.SetStateAction<boolean>>;
  ConceptList: string[];
  isMoreConcepts: boolean;
}

const MobileFilter: React.FunctionComponent<IMobileFilterProps> = ({
  allVideos,
  getTags,

  getSubcategory,
  handleSubcategoryClick,
  setIsMoreConcepts,
  ConceptList,
  isMoreConcepts,
}) => {
  return (
    <>
      {getTags && (
        <div className="border-border h-auto min-h-0 w-auto flex-1 grow scrollbar-none overflow-y-auto rounded border-2 sm:grow-0">
          <div className="mx-5 my-2 flex justify-between">
            <h2
              onClick={() => setIsMoreConcepts(true)}
              className={`${isMoreConcepts ? "bg-accent text-zinc-900" : "bg-border-900 text-zinc-300 inset-shadow-sm inset-shadow-zinc-900/60"} grow cursor-pointer rounded-l-lg px-4 py-1 text-sm`}
            >
              concepts
            </h2>
            <div
              onClick={() => setIsMoreConcepts(false)}
              className={`${!isMoreConcepts ? "bg-accent *:text-zinc-900" : "bg-border-900 inset-shadow-sm inset-shadow-zinc-900/60"} flex cursor-pointer gap-2 rounded-r-lg p-1 px-5 py-1`}
            >
              <h2 className="text-sm">tools</h2>
              <h2 className="text-sm">&</h2>
              <h2 className="text-sm"> topics</h2>
            </div>
          </div>
          <div className="mx-2 my-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {isMoreConcepts &&
              ConceptList?.map((concept, index) => (
                <span
                  onClick={() => handleSubcategoryClick(concept)}
                  className={`${getSubcategory.includes(concept) ? "bg-concept text-zinc-200 ring-[#aad97d]" : "ring-border"} h-auto w-auto cursor-pointer rounded px-1 py-1 text-zinc-400 ring-1`}
                  key={index}
                >
                  {concept}
                </span>
              ))}
          </div>
          {!isMoreConcepts && (
            <>
              <div className="mx-2 my-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <h2 className="text-sm text-zinc-400">tools</h2>
                {[
                  ...new Set(allVideos?.map((video) => video.tags[1].name)),
                ]?.map((tools, index) => (
                  <span
                    onClick={() => handleSubcategoryClick(tools)}
                    className={`${getSubcategory.includes(tools) ? "bg-tools text-zinc-200 ring-[#5a97d6]" : "ring-border"} h-auto w-auto cursor-pointer rounded px-1 py-1 text-zinc-400 ring-1`}
                    key={index}
                  >
                    {tools}
                  </span>
                ))}
              </div>
              <div className="mx-2 my-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <h2 className="text-sm text-zinc-400">topics</h2>
                {[
                  ...new Set(allVideos?.map((video) => video.tags[2].name)),
                ]?.map((topics, index) => (
                  <span
                    onClick={() => handleSubcategoryClick(topics)}
                    className={`${getSubcategory.includes(topics) ? "bg-topics text-zinc-200 ring-[#b7a1ff]" : "ring-border"} h-auto w-auto cursor-pointer rounded px-1 py-1 text-zinc-400 ring-1`}
                    key={index}
                  >
                    {topics}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MobileFilter;
