import { getUniqueTags, getVisibleTags } from "@/hooks/logic/tag.utils";
import { useFilterController } from "../hooks/controllers/useFilterController";
import { useTagController } from "../hooks/controllers/useTagController";
import { useCollapsedCount } from "../hooks/logic/UseCollapsedCount";
import { useVideoDetails } from "../hooks/logic/videoDetails";

function TagFilterContainer() {
  const { allVideos, ConceptList } = useVideoDetails();

  const { getCategory, setCategory } = useFilterController();
  const {
    setIsMoreConcepts,
    isMoreConcepts,
    setIsMoreTools,
    isMoreTools,
    setIsMoreTopics,
    isMoreTopics,
    getTag,
    setTag,
  } = useTagController();
  const collapsedCount = useCollapsedCount();
  const concepts = getVisibleTags(
    getUniqueTags(allVideos, 0),
    isMoreConcepts,
    collapsedCount,
  );
  const tools = getVisibleTags(
    getUniqueTags(allVideos, 1),
    isMoreTools,
    collapsedCount,
  );
  const topics = getVisibleTags(
    getUniqueTags(allVideos, 2),
    isMoreTopics,
    collapsedCount,
  );

  const handleSubcategoryClick = (subcategory: string) => {
    if (getTag.includes(subcategory)) {
      setTag(getTag.filter((sub) => sub !== subcategory));
    } else {
      setTag([...getTag, subcategory]);
    }
  };

  return {
    show: Boolean(getCategory),
    sections: [
      {
        title: "Concept",
        items: concepts,
        isMore: isMoreConcepts,
        toggle: () => setIsMoreConcepts((v) => !v),
        classNames: {
          active: "bg-concept text-zinc-100 inset-ring-[#aad97d]",
          inactive: "inset-ring-border text-zinc-400",
          background: "bg-[#aad97d]",
        },
      },
      {
        title: "Tools",
        items: tools,
        isMore: isMoreTools,
        toggle: () => setIsMoreTools((v) => !v),
        classNames: {
          active: "bg-tools text-zinc-100 inset-ring-[#5a97d6]",
          inactive: "inset-ring-border text-zinc-400",
          background: "bg-[#5a97d6]",
        },
      },
      {
        title: "Topics",
        items: topics,
        isMore: isMoreTopics,
        toggle: () => setIsMoreTopics((v) => !v),
        classNames: {
          active: "bg-topics text-zinc-100 inset-ring-[#b7a1ff]",
          inactive: "inset-ring-border text-zinc-400",
          background: "bg-[#b7a1ff]",
        },
      },
    ],
    selected: getTag,
    onSelect: handleSubcategoryClick,
  };
}

// (
//   <>
//     {getCategory && (
//       <div className="border-border h-auto w-auto grow rounded border-2 pb-2 sm:grow-0">
//         <TagFilterSection
//           title="Concept"
//           classNames={{
//             active: "bg-concept text-zinc-200 inset-ring-[#aad97d]",
//             inactive: "inset-ring-border",
//             background: "bg-[#aad97d]",
//           }}
//           isMore={isMoreConcepts}
//           items={concepts}
//           selected={getTag}
//           onClick={handleSubcategoryClick}
//           onToggle={() => setIsMoreConcepts(!isMoreConcepts)}
//         />
//         <TagFilterSection
//           title="Tools"
//           classNames={{
//             active: "bg-tools text-zinc-200 inset-ring-[#5a97d6]",
//             inactive: "inset-ring-border",
//             background: "bg-[#5a97d6]",
//           }}
//           isMore={isMoreTools}
//           items={tools}
//           selected={getTag}
//           onClick={handleSubcategoryClick}
//           onToggle={() => setIsMoreTools(!isMoreTools)}
//         />
//         <TagFilterSection
//           title="Topics"
//           classNames={{
//             active: "bg-topics text-zinc-200 inset-ring-[#b7a1ff]",
//             inactive: "inset-ring-border",
//             background: "bg-[#b7a1ff]",
//           }}
//           isMore={isMoreTopics}
//           items={topics}
//           selected={getTag}
//           onClick={handleSubcategoryClick}
//           onToggle={() => setIsMoreTopics(!isMoreTopics)}
//         />
//       </div>
//     )}
//   </>
// );
// }

export default TagFilterContainer;
