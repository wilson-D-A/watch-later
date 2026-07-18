import * as React from "react";

type FilterChipVariant = "concept" | "tools" | "topics";

interface FilterChipProps {
  label: string;
  active: boolean;
  variant: FilterChipVariant;
  onClick: () => void;
}

const variantStyles: Record<
  FilterChipVariant,
  {
    active: string;
    inactive: string;
  }
> = {
  concept: {
    active: "bg-concept text-zinc-200 ring-[#aad97d]",
    inactive: "text-zinc-400 ring-border",
  },
  tools: {
    active: "bg-tools text-zinc-200 ring-[#5a97d6]",
    inactive: "text-zinc-400 ring-border",
  },
  topics: {
    active: "bg-topics text-zinc-200 ring-[#b7a1ff]",
    inactive: "text-zinc-400 ring-border",
  },
};

const FilterChip: React.FC<FilterChipProps> = ({
  label,
  active,
  variant,
  onClick,
}) => {
  const styles = variantStyles[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer rounded px-2 py-1 ring-1 transition-colors hover:text-zinc-200 ${active ? styles.active : styles.inactive} `}
    >
      {label}
    </button>
  );
};

export default FilterChip;
