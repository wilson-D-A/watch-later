import * as React from "react";
import type { Video } from "../index";

interface INavProps {
  allVideos: Video[];
  getSearch: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  showComponent: boolean;
}

const Nav: React.FunctionComponent<INavProps> = (props) => {
  const { allVideos, getSearch, setSearch, showComponent } = props;

  return (
    <nav className="border-border bg-border/30 col-span-full row-span-1 flex items-center justify-center rounded border-2 sm:justify-between sm:px-5">
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <h1 className="text-accent text-xl font-black">Watch Later</h1>
        <span className="bg-border-900 h-auto rounded px-5 py-1 text-center align-middle text-zinc-300 inset-shadow-sm inset-shadow-zinc-900/60">
          {allVideos?.length} videos
        </span>
      </div>
      {showComponent && (
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search titles, channels..."
          className="border-border bg-background w-60 rounded border px-2 py-1 text-zinc-300 outline-none"
        />
      )}
    </nav>
  );
};

export default Nav;
