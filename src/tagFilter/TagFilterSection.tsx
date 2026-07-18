import React from "react";
import TagFilterButton from "../components/TagFilterButton";
interface ITagFilterSectionProps {
  title: string;
  color: string;
  items: string[];
  selected: string;
  onClick: (item: string) => void;
  onToggle: () => void;
  children?: React.ReactNode;
}
const TagFilterSection: React.FunctionComponent<ITagFilterSectionProps> = ({
  title,
  color,
  items,
  selected,
  onClick,
  onToggle,
  children,
}) => {
  return (
    <div
      className={`mx-2 mt-2 flex flex-col gap-2 overflow-hidden sm:flex-row sm:flex-wrap`}
    >
      <h2>{title}</h2>
      {items?.map((item, index) => (
        <span
          onClick={() => onClick(item)}
          className={`${selected === item ? `bg-${color} text-zinc-200 inset-ring-[#aad97d]` : "inset-ring-border"} h-auto w-auto cursor-pointer rounded px-1 py-1 text-zinc-400 inset-ring-1`}
          key={index}
        >
          {item}
        </span>
      ))}
      <TagFilterButton isMoreTools={false} onToggle={onToggle} />
    </div>
  );
};
export default TagFilterSection;
