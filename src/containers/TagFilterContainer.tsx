import { useVideoDetails } from "../hooks/videoDetails";
import { useCollapsedCount } from "../tagFilter/hooks/UseCollapsedCount";
import TagFilterSection from "../tagFilter/TagFilterSection";
import { getUniqueTags, getVisibleTags } from "../tagFilter/utils/tag.utils";
import { useFilterController } from "./FilterController";
import { useTagController } from "./TagController";

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

  return (
    <>
      {getCategory && (
        <div className="border-border h-auto w-auto grow rounded border-2 pb-2 sm:grow-0">
          <TagFilterSection
            title="Concept"
            color="concept"
            items={concepts}
            selected={getCategory}
            onClick={handleSubcategoryClick}
            onToggle={() => setIsMoreConcepts(!isMoreConcepts)}
          />
          <TagFilterSection
            title="Tools"
            color="tools"
            items={tools}
            selected={getCategory}
            onClick={handleSubcategoryClick}
            onToggle={() => setIsMoreTools(!isMoreTools)}
          />
          <TagFilterSection
            title="Topics"
            color="topics"
            items={topics}
            selected={getCategory}
            onClick={handleSubcategoryClick}
            onToggle={() => setIsMoreTopics(!isMoreTopics)}
          />
        </div>
      )}
    </>
  );
}

export default TagFilterContainer;
