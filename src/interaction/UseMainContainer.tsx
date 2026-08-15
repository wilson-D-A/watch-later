import { useVideoDetails } from "@/hooks/logic/videoDetails";
import ViewCards from "@/presentation/main/ViewCards";
import ViewCardsSkeleton from "@/presentation/main/ViewCardsSkeleton";
import ViewShortsCards from "@/presentation/main/ViewShortsCards";
import React, { useEffect, useRef } from "react";
interface IUseMainContainerProps {
  children?: React.ReactNode;
}

const UseMainContainer: React.FunctionComponent<IUseMainContainerProps> = ({
  children,
}) => {
  const [inView, setInView] = React.useState(false);
  const { filteredVideos, status, fetchNextPage, isLoading } =
    useVideoDetails();
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (inView && status === "success") {
      fetchNextPage();
    }
  }, [inView, status, fetchNextPage]);

  return (
    <>
      {isLoading ? (
        <>
          <ViewCardsSkeleton count={8} />
        </>
      ) : (
        <>
          {filteredVideos.map((video) => {
            if (video.is_short) {
              return (
                <ViewShortsCards
                  key={video.id}
                  id={video.id}
                  url={video.url}
                  title={video.title}
                  channelName={video.channelName}
                  concept={video.tags[0].name}
                  tools={video.tags[1].name}
                  topics={video.tags[2].name}
                  thumbnail={video.thumbnail}
                />
              );
            } else {
              return (
                <ViewCards
                  key={video.id}
                  id={video.id}
                  url={video.url}
                  title={video.title}
                  channelName={video.channelName}
                  concept={video.tags[0].name}
                  tools={video.tags[1].name}
                  topics={video.tags[2].name}
                  thumbnail={video.thumbnail}
                />
              );
            }
          })}
        </>
      )}
      <div ref={containerRef}>.</div>
    </>
  );
};

export default UseMainContainer;
