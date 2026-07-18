import { useEffect, useState } from "react";
import FilterComponent from "./components/FilterComponent";
import Main from "./components/main";
import MobileFilter from "./components/mobileFilterComponent";
import Search from "./components/search";
import ViewCards from "./components/ViewCards";
import AsideContainer from "./containers/AsideContainer";
import { useFilterController } from "./containers/FilterController";
import NavContainer from "./containers/NavContainer";
import { useTagController } from "./containers/TagController";
import { getYouTubeId, useVideoDetails } from "./hooks/videoDetails";
export type Video = {
  id: number;
  title: string;
  url: string;
  videoLength: string;
  channelName: string;
  category: string;
  tags: { name: string }[];
};

export default function WatchLater() {
  const {
    getCategory,
    setCategory,
    asideOpen,
    setAsideOpen,
    filterOpen,
    setFilterOpen,
  } = useFilterController();
  const {
    getTag,
    setTag,
    isMoreConcepts,
    setIsMoreConcepts,
    isMoreTools,
    setIsMoreTools,
    isMoreTopics,
    setIsMoreTopics,
    handleSubcategoryClick,
  } = useTagController();
  const [showComponent, setShowComponent] = useState<boolean>(false);

  const { filteredVideos, allVideos, ConceptList, categoryCounts } =
    useVideoDetails();

  useEffect(() => {
    const handleResize = () => {
      setShowComponent(window.innerWidth >= 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative h-screen w-screen bg-[#010c15] p-4">
      <div className="grid h-full grid-cols-5 grid-rows-7 gap-4">
        <NavContainer showComponent={showComponent} />

        {showComponent && <AsideContainer showComponent={showComponent} />}
        <main className="col-span-full row-span-6 h-full min-h-0 overflow-hidden rounded sm:col-span-4">
          <section className="flex h-full min-h-0 flex-col gap-4">
            {asideOpen ? (
              <AsideContainer showComponent={showComponent} />
            ) : filterOpen ? (
              <MobileFilter
                allVideos={allVideos}
                getTags={getCategory}
                setTags={setCategory}
                handleSubcategoryClick={handleSubcategoryClick}
                getSubcategory={getTag}
                setSubcategory={setTag}
                setIsMoreConcepts={setIsMoreConcepts}
                ConceptList={ConceptList}
                isMoreConcepts={isMoreConcepts}
              />
            ) : (
              <Main>
                {showComponent && (
                  <FilterComponent
                    allVideos={allVideos}
                    getTags={getCategory}
                    setTags={setCategory}
                    handleSubcategoryClick={handleSubcategoryClick}
                    setIsMoreConcepts={setIsMoreConcepts}
                    ConceptList={ConceptList.sort((a, b) => a.localeCompare(b))}
                    isMoreConcepts={isMoreConcepts}
                    setIsMoreTools={setIsMoreTools}
                    isMoreTools={isMoreTools}
                    setIsMoreTopics={setIsMoreTopics}
                    isMoreTopics={isMoreTopics}
                  />
                )}

                <section
                  className={`grid min-h-0 flex-1 scrollbar-none grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 overflow-x-clip overflow-y-auto`}
                >
                  {filteredVideos.map((video) => (
                    <ViewCards
                      key={video.id}
                      id={video.id}
                      url={video.url}
                      title={video.title}
                      channelName={video.channelName}
                      concept={video.tags[0].name}
                      tools={video.tags[1].name}
                      topics={video.tags[2].name}
                      getYouTubeId={getYouTubeId}
                    />
                  ))}
                </section>
              </Main>
            )}
            {!showComponent && <Search />}
          </section>
        </main>
      </div>
    </div>
  );
}
