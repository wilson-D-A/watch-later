import { useFilterController } from "../hooks/controllers/useFilterController";
import { useVideoDetails } from "../hooks/logic/videoDetails";
import useGetCategories from "../hooks/services/useGetCategories";
import Nav from "../presentation/nav/nav";
function NavContainer({ showComponent }: { showComponent: boolean }) {
  const { allVideos } = useVideoDetails();
  const { setSearch } = useFilterController();
  const { data } = useGetCategories();
  function handleSearchChange(e: string) {
    setSearch(e);
  }

  return (
    <Nav
      allVideos={data?.all_videos ?? 0}
      videoLength={allVideos.length.toString()}
      setSearch={handleSearchChange}
      showComponent={showComponent}
    />
  );
}

export default NavContainer;
