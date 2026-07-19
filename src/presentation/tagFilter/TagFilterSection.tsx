import React from "react";
import TagFilterButton from "./TagFilterButton";
interface ITagFilterSectionProps {
  title: string;
  classNames: { active?: string; inactive?: string; background?: string };
  isMore: boolean;
  items: string[];
  selected: string[];
  onClick: (item: string) => void;
  onToggle: () => void;

  children?: React.ReactNode;
}
const TagFilterSection: React.FunctionComponent<ITagFilterSectionProps> = ({
  title,
  classNames,
  isMore,
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
          className={`${selected.includes(item) ? classNames.active : classNames.inactive} h-auto w-auto cursor-pointer rounded px-1 py-1 text-zinc-400 inset-ring-1`}
          key={index}
        >
          {item}
        </span>
      ))}
      <TagFilterButton
        isMore={isMore}
        onToggle={onToggle}
        classNames={{
          active: classNames.active,
          inactive: classNames.background,
        }}
      />
    </div>
  );
};
export default TagFilterSection;
