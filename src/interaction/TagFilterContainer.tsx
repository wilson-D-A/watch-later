import TagFilterSection from "@/presentation/tagFilter/TagFilterSection";
import { useMediaQuery } from "react-responsive";
import TagMobileFilter from "../presentation/tagFilter/TagMobileFilterSection";
import useTagFilterContainer from "./useTagFilterContainer";
function TagFilterContainer() {
  const props = useTagFilterContainer();

  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  if (!props.show) return null;

  return isMobile ? (
    <>
      <TagMobileFilter {...props} />
    </>
  ) : (
    <>
      {props.sections.map((section) => (
        <TagFilterSection
          key={section.title}
          section={section}
          selected={props.selected}
          onSelect={props.onSelect}
        />
      ))}
    </>
  );
}
export default TagFilterContainer;
