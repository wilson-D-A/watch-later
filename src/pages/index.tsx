import { useEffect, useState } from "react";
import FilterIcon from "../../public/FilterIcon";
import Aside from "./components/aside";
import FilterComponent from "./components/FilterComponent";
import Main from "./components/main";
import MobileFilter from "./components/mobileFilterComponent";
import Nav from "./components/nav";
import ViewCards from "./components/ViewCards";
import { VideoDetails, getYouTubeId } from "./hooks/videoDetails";

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
  const [getCategory, setCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [asideOpen, setAsideOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [getTag, setTag] = useState<string[]>([]);
  const [isMoreConcepts, setIsMoreConcepts] = useState<boolean>(false);
  const [isMoreTools, setIsMoreTools] = useState<boolean>(false);
  const [isMoreTopics, setIsMoreTopics] = useState<boolean>(false);
  const [showComponent, setShowComponent] = useState<boolean>(false);

  const {
    filteredVideos,
    filteredTag,
    allVideos,
    firstSuggestion,
    ConceptList,
    categoryCounts,
  } = VideoDetails(getCategory, search, getTag);

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
        <Nav
          showComponent={showComponent}
          allVideos={allVideos}
          getSearch={search}
          setSearch={setSearch}
        />

        {showComponent && (
          <Aside
            showComponent={showComponent}
            setFilterOpen={setFilterOpen}
            setAsideOpen={setAsideOpen}
            getCategory={getCategory}
            setCategory={setCategory}
            getTag={getTag}
            setTag={setTag}
            setIsMoreConcepts={setIsMoreConcepts}
            categoryCount={categoryCounts}
          />
        )}
        <main className="col-span-full row-span-6 h-full min-h-0 overflow-hidden rounded sm:col-span-4">
          <section className="flex h-full min-h-0 flex-col gap-4">
            {asideOpen ? (
              <Aside
                showComponent={showComponent}
                setFilterOpen={setFilterOpen}
                setAsideOpen={setAsideOpen}
                getCategory={getCategory}
                setCategory={setCategory}
                getTag={getTag}
                setTag={setTag}
                setIsMoreConcepts={setIsMoreConcepts}

                categoryCount={categoryCounts}
              />
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
            {!showComponent && (
              <div className="border-border flex h-15 w-auto items-center justify-between rounded border-2">
                <div className="flex items-center">
                  <span
                    onClick={() => setAsideOpen(!asideOpen)}
                    className={`${searchOpen ? "hidden" : ""} bg-accent mx-2 w-30 cursor-pointer truncate rounded px-2 py-1 text-zinc-900`}
                  >
                    {getCategory || "all videos"}
                  </span>
                  <span
                    onClick={() => {
                      if (!getCategory) return;
                      setFilterOpen(!filterOpen);
                      setIsMoreConcepts(true);
                    }}
                    className={`${!getCategory ? "pointer-events-none" : "fill-accent bg-border-900 cursor-pointer"} ${filterOpen ? "fill-border-900 bg-accent" : "bg-border-900"} ${searchOpen ? "hidden" : ""} mx-2 size-6 rounded`}
                  >
                    <FilterIcon
                      width={15}
                      height={15}
                      className={`translate-x-1 translate-y-1`}
                    />
                  </span>
                </div>
                <div
                  className={`${searchOpen ? "ml-2 grow" : " "} relative mx-3 w-72 truncate`}
                >
                  <div className="pointer-events-none absolute inset-0 flex items-center px-2 py-1 text-zinc-500">
                    <span className="invisible outline-none">{search}</span>

                    <span className="outline-none">
                      {firstSuggestion?.title
                        ?.slice(search.length)
                        .toLowerCase()}
                    </span>
                  </div>

                  <input
                    type="text"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    onClick={() => setSearchOpen(true)}
                    onBlur={() => setSearchOpen(false)}
                    placeholder="Search titles, channels..."
                    className={`border-border relative w-full rounded border bg-transparent px-1 py-1 text-white outline-none focus:ring-0`}
                  />
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
