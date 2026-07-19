import * as React from "react";

interface IAsideProps {
  getCategory: string;
  children: React.ReactNode;
  handleAsideClick: () => void;
}

const Aside: React.FunctionComponent<IAsideProps> = ({
  getCategory,
  children,
  handleAsideClick,
}) => {
  return (
    <aside className="border-border relative row-span-6 min-h-0 overflow-hidden rounded border-2">
      <div className="bg-bg border-border absolute top-0 left-0 mb-10 flex w-full justify-center border-b-2 py-5 inset-shadow-sm">
        <span
          onClick={() => handleAsideClick()}
          className={`h-auto cursor-pointer rounded px-1 py-1 text-center align-middle text-zinc-300 md:px-5 ${getCategory === "" ? "bg-accent text-zinc-900" : "bg-border-900 text-zinc-300 inset-shadow-sm inset-shadow-zinc-900/60"}`}
        >
          all videos
        </span>
      </div>
      <ul className="mx-3 h-full min-h-0 w-auto scrollbar-none overflow-y-scroll pt-20">
        <h2 className="mb-2">tags</h2>

        {children}
      </ul>
    </aside>
  );
};

export default Aside;
