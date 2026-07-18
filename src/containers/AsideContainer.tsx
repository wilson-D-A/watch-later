import Aside from "../components/aside";
import ListCategories from "../components/ListCategories";
import { useVideoDetails } from "../hooks/videoDetails";
import { useFilterController } from "./FilterController";
import { useTagController } from "./TagController";
function AsideContainer({ showComponent }: { showComponent: boolean }) {
  const { categoryCounts } = useVideoDetails();
  const { getCategory, setCategory, setAsideOpen, setFilterOpen } =
    useFilterController();
  const { setTag, setIsMoreConcepts } = useTagController();

  function handleCategoryClick(category: string) {
    if (!showComponent) {
      setAsideOpen(false);
    }

    setCategory(category);
    setTag([]);
    setIsMoreConcepts(false);
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
      {Object.entries(categoryCounts).map(([category, count]) => (
        <ListCategories
          key={category}
          category={category}
          count={count}
          getCategory={getCategory}
          handleCategoryClick={handleCategoryClick}
        />
      ))}
    </Aside>
  );
}

export default AsideContainer;
