import { useFilterController } from "../hooks/controllers/useFilterController";
import useGetCategories from "../hooks/services/useGetCategories";
import Nav from "../presentation/nav/nav";
function NavContainer({ showComponent }: { showComponent: boolean }) {
  const { setSearch } = useFilterController();
  const { data } = useGetCategories();
  function handleSearchChange(e: string) {
    setSearch(e);
  }

  return (
    <Nav
      allVideos={data?.all_videos ?? 0}
      setSearch={handleSearchChange}
      showComponent={showComponent}
    />
  );
}

export default NavContainer;
