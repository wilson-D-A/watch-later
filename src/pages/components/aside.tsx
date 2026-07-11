import * as React from "react";

interface IAsideProps {
  getCategory: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  getTag: string[];
  setTag: React.Dispatch<React.SetStateAction<string[]>>;
  setIsMoreConcepts: React.Dispatch<React.SetStateAction<boolean>>;
  categoryCount: Record<string, number>;
  setAsideOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showComponent: boolean;
}

const Aside: React.FunctionComponent<IAsideProps> = ({
  getCategory,
  setCategory,
  setTag,
  setIsMoreConcepts,
  showComponent,
  categoryCount,
  setAsideOpen,
  setFilterOpen,
}) => {
  return (
    <aside className="border-border relative row-span-6 min-h-0 overflow-hidden rounded border-2">
      <div className="bg-bg border-border absolute top-0 left-0 mb-10 flex w-full justify-center border-b-2 py-5 inset-shadow-sm">
        <span
          onClick={() => {
            if (!showComponent) {
              setAsideOpen(false);
              setFilterOpen(false);
            }

            setCategory("");
            setTag([]);
          }}
          className={`h-auto cursor-pointer rounded px-1 py-1 text-center align-middle text-zinc-300 md:px-5 ${getCategory === "" ? "bg-accent text-zinc-900" : "bg-border-900 text-zinc-300 inset-shadow-sm inset-shadow-zinc-900/60"}`}
        >
          all videos
        </span>
      </div>
      <ul className="mx-3 h-full min-h-0 w-auto scrollbar-none overflow-y-scroll pt-20">
        <h2 className="mb-2">tags</h2>
        {Object.entries(categoryCount ?? {}).map(([category, count]) => (
          <li className=" " key={category}>
            <button
              className={`${getCategory === category ? "bg-accent text-zinc-900" : ""} my-3 flex w-full cursor-pointer justify-between rounded px-2 py-3 align-middle text-5xl text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100`}
              onClick={() => {
                if (!showComponent) {
                  setAsideOpen(false);
                }
                setCategory(category);
                setTag([]);
                setIsMoreConcepts(false);
              }}
            >
              <span className="w-28 overflow-hidden text-start">
                {category}
              </span>
              {
                <span className="ml-2 hidden text-zinc-500 md:inline">
                  {count}
                </span>
              }
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Aside;
