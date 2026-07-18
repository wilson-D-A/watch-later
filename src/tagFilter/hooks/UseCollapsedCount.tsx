import { useEffect, useState } from "react";

export function useCollapsedCount() {
  const [collapsedCount, setCollapsedCount] = useState(6);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;

      if (width < 899) setCollapsedCount(4);
      else if (width < 1284) setCollapsedCount(5);
      else if (width < 1865) setCollapsedCount(9);
      else setCollapsedCount(8);
    };

    update();

    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return collapsedCount;
}
