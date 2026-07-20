import type { TagFilterSectionData } from "@/types/TagFilterSectionData";
import TagFilterButton from "./TagFilterButton";

interface TagFilterSectionProps {
  section: TagFilterSectionData;
  selected: string[];
  onSelect: (tag: string) => void;
}

export default function TagFilterSection({
  section,
  selected,
  onSelect,
}: TagFilterSectionProps) {
  return (
    <div className="mx-2 flex flex-col gap-2 overflow-hidden sm:flex-row sm:flex-wrap">
      <h2>{section.title}</h2>

      {section.items.map((item) => (
        <span
          key={item}
          onClick={() => onSelect(item)}
          className={`${
            selected.includes(item)
              ? section.classNames.active
              : section.classNames.inactive
          } h-auto w-auto cursor-pointer rounded px-1 py-1 inset-ring-1`}
        >
          {item}
        </span>
      ))}

      <TagFilterButton
        isMore={section.isMore}
        onToggle={section.toggle}
        classNames={{
          active: section.classNames.active,
          inactive: section.classNames.background,
        }}
      />
    </div>
  );
}
