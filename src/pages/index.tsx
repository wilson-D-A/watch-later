import UseMainContainer from "@/interaction/UseMainContainer";
import { useEffect, useState } from "react";
import { useFilterController } from "../hooks/controllers/useFilterController";
import { useTagController } from "../hooks/controllers/useTagController";
import TagFilterContainer from "../interaction/TagFilterContainer";
import AsideContainer from "../interaction/useAsideContainer";
import NavContainer from "../interaction/useNavContainer";
import Search from "../presentation/nav/search";

export default function WatchLater() {
  const { asideOpen, filterOpen } = useFilterController();
  const { getTag, setTag } = useTagController();
  const [showComponent, setShowComponent] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setShowComponent(window.innerWidth >= 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubcategoryClick = (subcategory: string) => {
    if (getTag.includes(subcategory)) {
      setTag(getTag.filter((sub) => sub !== subcategory));
    } else {
      setTag([...getTag, subcategory]);
    }
  };

  return (
    <div className="relative h-screen w-screen bg-[#010c15] p-4">
      <div className="grid h-full grid-cols-5 grid-rows-7 gap-4">
        <NavContainer showComponent={showComponent} />

        {showComponent && <AsideContainer showComponent={showComponent} />}
        <main className="col-span-full row-span-6 h-full min-h-0 overflow-hidden rounded sm:col-span-4">
          <section className="flex h-full min-h-0 flex-col gap-1">
            {asideOpen ? (
              <AsideContainer showComponent={showComponent} />
            ) : filterOpen ? (
              <TagFilterContainer />
            ) : (
              <>
                {showComponent && <TagFilterContainer />}
                <section
                  className={`grid min-h-0 flex-1 scrollbar-none grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 overflow-x-clip overflow-y-auto`}
                >
                  <UseMainContainer />
                </section>
              </>
            )}
            {!showComponent && <Search />}
          </section>
        </main>
      </div>
    </div>
  );
}
