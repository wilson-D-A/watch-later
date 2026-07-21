import type { TagFilterContainerProps } from "@/types/TagFilterSectionData";
import * as React from "react";

const TagMobileFilter: React.FC<TagFilterContainerProps> = ({
  show,
  sections,
  selected,
  onSelect,
}) => {
  const [activeSection, setActiveSection] = React.useState(0);

  if (!show) return null;

  const section = sections[activeSection];

  return (
    <div className="border-border relative h-auto min-h-0 w-auto flex-1 overflow-y-auto rounded border-2">
      {/* Section Tabs */}
      <div className="sticky top-1 mx-5 my-2 flex">
        {sections.map((s: any, index: any) => (
          <button
            key={s.title}
            onClick={() => setActiveSection(index)}
            className={`grow px-4 py-1 text-sm first:rounded-l-lg last:rounded-r-lg ${
              activeSection === index
                ? "bg-accent text-zinc-900"
                : "bg-border-900 text-zinc-300 inset-shadow-sm inset-shadow-zinc-900/60"
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Active Section */}
      <div className="mx-2 my-2 flex flex-col gap-2">
        {section.items.map((item: any) => (
          <span
            key={item}
            onClick={() => onSelect(item)}
            className={`cursor-pointer rounded px-1 py-2 text-zinc-200 inset-ring-1 ${
              selected.includes(item)
                ? section.classNames.active
                : section.classNames.inactive
            }`}
          >
            {(console.log(item), item)}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagMobileFilter;
