import React, { createContext, useContext, useState } from "react";

export interface FilterControllerType {
  getCategory: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  asideOpen: boolean;
  setAsideOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filterOpen: boolean;
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const FilterContext = createContext<FilterControllerType | undefined>(
  undefined,
);

function FilterProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState<string>("");
  const [getCategory, setCategory] = useState<string>("");
  const [asideOpen, setAsideOpen] = useState<boolean>(false);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);

  return (
    <FilterContext.Provider
      value={{
        getCategory,
        setCategory,
        asideOpen,
        setAsideOpen,
        filterOpen,
        setFilterOpen,
        search,
        setSearch,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export const useFilterController = (): FilterControllerType => {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error("useFilterController must be used within FilterProvider");
  }

  return context;
};

export default FilterProvider;
