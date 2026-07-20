export interface TagFilterSectionData {
  title: string;
  items: string[];
  isMore: boolean;
  toggle: () => void;
  classNames: {
    active: string;
    inactive: string;
    background: string;
  };
}

export interface TagFilterContainerProps {
  sections: TagFilterSectionData[];
  selected: string[];
  onSelect: (tag: string) => void;
}
