import Nav from "../components/nav";
import { useVideoDetails } from "../hooks/videoDetails";
import { useFilterController } from "./FilterController";
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
