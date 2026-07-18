interface ITagFilterButtonProps {
  isMoreTools: boolean;
  onToggle: () => void;
  classNames?: { active?: string; inactive?: string };
}

function TagFilterButton({
  isMoreTools,
  onToggle,
  classNames = {},
}: ITagFilterButtonProps) {
  const { active, inactive } = classNames;
  return (
    <span
      onClick={() => onToggle()}
      className={`${isMoreTools ? active : inactive} ml-2 cursor-pointer rounded px-2 py-1 text-zinc-400 ring-1 hover:text-zinc-200`}
    >
      {isMoreTools ? "less" : "more"}
    </span>
  );
}

export default TagFilterButton;
