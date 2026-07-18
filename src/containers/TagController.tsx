import React, { createContext, useContext, useState } from "react";

interface TagContextType {
  getTag: string[];
  setTag: React.Dispatch<React.SetStateAction<string[]>>;
  isMoreConcepts: boolean;
  setIsMoreConcepts: React.Dispatch<React.SetStateAction<boolean>>;
  isMoreTools: boolean;
  setIsMoreTools: React.Dispatch<React.SetStateAction<boolean>>;
  isMoreTopics: boolean;
  setIsMoreTopics: React.Dispatch<React.SetStateAction<boolean>>;
}

const TagContext = createContext<TagContextType | undefined>(undefined);

function TagProvider({ children }: { children: React.ReactNode }) {
  const [getTag, setTag] = useState<string[]>([]);
  const [isMoreConcepts, setIsMoreConcepts] = useState<boolean>(false);
  const [isMoreTools, setIsMoreTools] = useState<boolean>(false);
  const [isMoreTopics, setIsMoreTopics] = useState<boolean>(false);

  return (
    <TagContext.Provider
      value={{
        getTag,
        setTag,
        isMoreConcepts,
        setIsMoreConcepts,
        isMoreTools,
        setIsMoreTools,
        isMoreTopics,
        setIsMoreTopics,
      }}
    >
      {children}
    </TagContext.Provider>
  );
}

export const useTagController = (): TagContextType => {
  const context = useContext(TagContext);

  if (!context) {
    throw new Error("useTagController must be used within TagProvider");
  }

  return context;
};

export default TagProvider;
