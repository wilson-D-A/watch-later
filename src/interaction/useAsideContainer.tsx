import { useFilterController } from "../hooks/controllers/useFilterController";
import { useTagController } from "../hooks/controllers/useTagController";
import { useVideoDetails } from "../hooks/logic/videoDetails";
import useGetCategories from "../hooks/services/useGetCategories";
import Aside from "../presentation/aside/aside";
import ListCategories from "../presentation/aside/ListCategories";
function AsideContainer({ showComponent }: { showComponent: boolean }) {
  const { categoryCounts } = useVideoDetails();
  const { data: categoryData } = useGetCategories();
  const { getCategory, setCategory, setAsideOpen, setFilterOpen } =
    useFilterController();
  const { setTag, setIsMoreConcepts, setIsMoreTopics, setIsMoreTools } =
    useTagController();

  function handleCategoryClick(category: string) {
    if (!showComponent) {
      setAsideOpen(false);
    }

    setCategory(category);
    setTag([]);
    setIsMoreConcepts(false);
    setIsMoreTopics(false);
    setIsMoreTools(false);
  }

  function handleAsideClick() {
    if (!showComponent) {
      setAsideOpen(false);
      setFilterOpen(false);
    }

    setCategory("");
    setTag([]);
  }

  return (
    <Aside getCategory={getCategory} handleAsideClick={handleAsideClick}>
      {Object.entries(categoryData?.categories || {}).map(
        ([category, count]) => (
          <ListCategories
            key={category}
            category={category}
            count={count}
            getCategory={getCategory}
            handleCategoryClick={handleCategoryClick}
          />
        ),
      )}
    </Aside>
  );
}

export default AsideContainer;
