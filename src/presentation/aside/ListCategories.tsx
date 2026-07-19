interface IListCategoriesProps {
  category: string;
  count: number;
  getCategory: string;
  handleCategoryClick: (category: string) => void;
}
function ListCategories({
  category,
  count,
  getCategory,
  handleCategoryClick,
}: IListCategoriesProps) {
  return (
    <li>
      <button
        className={`${getCategory === category ? "bg-accent text-zinc-900" : ""} my-3 flex w-full cursor-pointer justify-between rounded px-2 py-3 align-middle text-5xl text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100`}
        onClick={() => handleCategoryClick(category)}
      >
        <span className="w-28 overflow-hidden text-start">{category}</span>
        <span className="ml-2 hidden text-zinc-500 md:inline">{count}</span>
      </button>
    </li>
  );
}

export default ListCategories;
