interface ITagFilterButtonProps {
  isMore: boolean;
  onToggle: () => void;
  classNames?: { active?: string; inactive?: string };
}

function TagFilterButton({
  isMore,
  onToggle,
  classNames = {},
}: ITagFilterButtonProps) {
  const { active, inactive } = classNames;
  return (
    <span
      onClick={() => onToggle()}
      className={`${isMore ? `${active} text-zinc-200 inset-ring-1` : `${inactive} text-zinc-900`} ml-2 cursor-pointer rounded px-2 py-1 hover:text-zinc-200`}
    >
      {isMore ? "less" : "more"}
    </span>
  );
}

export default TagFilterButton;
