import MobileFilter from "@/presentation/tagFilter/mobileFilterComponent";
import { useEffect, useState } from "react";
import { useFilterController } from "../hooks/controllers/useFilterController";
import { useTagController } from "../hooks/controllers/useTagController";
import { getYouTubeId, useVideoDetails } from "../hooks/logic/videoDetails";
import AsideContainer from "../interaction/useAsideContainer";
import NavContainer from "../interaction/useNavContainer";
import TagFilterContainer from "../interaction/useTagFilterContainer";
import ViewCards from "../presentation/main/ViewCards";
import Search from "../presentation/nav/search";
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

  const handleSubcategoryClick = (subcategory: string) => {
    if (getTag.includes(subcategory)) {
      setTag(getTag.filter((sub) => sub !== subcategory));
    } else {
      setTag([...getTag, subcategory]);
    }
  };

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
              <>
                {showComponent && <TagFilterContainer />}
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
              </>
            )}
            {!showComponent && <Search />}
          </section>
        </main>
      </div>
    </div>
  );
}
