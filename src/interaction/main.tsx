import { getYouTubeId, useVideoDetails } from "@/hooks/logic/videoDetails";
import ViewCards from "@/presentation/main/ViewCards";
import * as React from "react";
interface IMainProps {
  children?: React.ReactNode;
}

const Main: React.FunctionComponent<IMainProps> = ({ children }) => {
  const { filteredVideos } = useVideoDetails();

  return (
    <>
      {filteredVideos.map((video) => (
        <ViewCards
          key={video.id}
          id={video.id}
          url={video.url}
          title={video.title}
          channelName={video.channelName}
          concept={video.tags[0].name}
          tools={video.tags[1].name}
          topics={video.tags[2].name}
          getYouTubeId={getYouTubeId}
        />
      ))}
      {/* < */}
    </>
  );
};

export default Main;
