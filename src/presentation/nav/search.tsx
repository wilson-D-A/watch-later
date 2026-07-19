import { useFilterController } from "@/hooks/controllers/useFilterController";
import { useTagController } from "@/hooks/controllers/useTagController";
import { useVideoDetails } from "@/hooks/logic/videoDetails";
import FilterIcon from "../../../public/FilterIcon";
function Search() {
  const { firstSuggestion } = useVideoDetails();
  const {
    search,
    setSearch,
    setAsideOpen,
    asideOpen,
    filterOpen,
    setFilterOpen,
    getCategory,
  } = useFilterController();
  const { setIsMoreConcepts } = useTagController();

  return (
    <div className="border-border flex h-15 w-auto items-center justify-between rounded border-2">
      <div className="flex items-center">
        <span
          onClick={() => setAsideOpen(!asideOpen)}
          className={`${asideOpen ? "hidden" : ""} bg-accent mx-2 w-30 cursor-pointer truncate rounded px-2 py-1 text-zinc-900`}
        >
          {getCategory || "all videos"}
        </span>
        <span
          onClick={() => {
            if (!getCategory) return;
            setFilterOpen(!filterOpen);
            setIsMoreConcepts(true);
          }}
          className={`${!getCategory ? "pointer-events-none" : "fill-accent bg-border-900 cursor-pointer"} ${filterOpen ? "fill-border-900 bg-accent" : "bg-border-900"} ${asideOpen ? "hidden" : ""} mx-2 size-6 rounded`}
        >
          <FilterIcon
            width={15}
            height={15}
            className={`translate-x-1 translate-y-1`}
          />
        </span>
      </div>
      <div
        className={`${asideOpen ? "ml-2 grow" : " "} relative mx-3 w-72 truncate`}
      >
        <div className="pointer-events-none absolute inset-0 flex items-center px-2 py-1 text-zinc-500">
          <span className="invisible outline-none">{search}</span>

          <span className="outline-none">{firstSuggestion}</span>
        </div>

        <input
          type="text"
          onChange={(e) => setSearch(e.currentTarget.value)}
          onClick={() => setAsideOpen(true)}
          onBlur={() => setAsideOpen(false)}
          placeholder="Search titles, channels..."
          className={`border-border relative w-full rounded border bg-transparent px-1 py-1 text-white outline-none focus:ring-0`}
        />
      </div>
    </div>
  );
}

export default Search;
