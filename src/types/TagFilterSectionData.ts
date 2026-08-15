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
  show: boolean;
  sections: TagFilterSectionData[];
  selected: string[];
  onSelect: (tag: string) => void;
}
export interface Video {
  id: number;
  title: string;
  url: string;
  videoLength: string;
  is_short: boolean;
  thumbnail: string;
  channelName: string;
  category: string;
  tags: { name: string }[];
}
