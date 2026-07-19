import { useFilterController } from "../hooks/controllers/useFilterController";
import { useVideoDetails } from "../hooks/logic/videoDetails";
import Nav from "../presentation/nav/nav";
function NavContainer({ showComponent }: { showComponent: boolean }) {
  const { allVideos } = useVideoDetails();
  const { setSearch } = useFilterController();

  function handleSearchChange(e: string) {
    setSearch(e);
  }

  return (
    <Nav
      allVideos={allVideos}
      videoLength={allVideos.length.toString()}
      setSearch={handleSearchChange}
      showComponent={showComponent}
    />
  );
}

export default NavContainer;
