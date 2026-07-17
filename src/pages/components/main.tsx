import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import * as React from "react";
import { useState } from "react";
import { patchTags } from "../api/getVideos";
import type { Video } from "../index";
import Modal from "./Modal";
interface IMainProps {
  getTags: string;
  getSubcategory: string[];
  handleSubcategoryClick: (subcategory: string) => void;
  allVideos: Video[];
  ConceptList: string[];
  dialog: React.RefObject<HTMLDialogElement | null> | null;
  getYouTubeId: (url: string) => string | null;
  children?: React.ReactNode;
}

const Main: React.FunctionComponent<IMainProps> = ({
  getTags,
  getSubcategory,
  handleSubcategoryClick,
  allVideos,
  ConceptList,
  dialog,
  getYouTubeId,
  children,
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [changeTag, setChangeTag] = useState<{ [key: string]: string }>({
    concepts: "",
    tools: "",
    topics: "",
  });
  const mutate = useMutation({
    mutationFn: ({
      id,
      tags,
    }: {
      id: number;
      tags: Record<string, string>[];
    }) => patchTags(id, tags),
  });

  const onClose = () => {
    setShowDialog(false);
    setChangeTag({
      concepts: "",
      tools: "",
      topics: "",
    });
  };

  const onOk = (id: number) => {
    mutate.mutate({
      id,
      tags: [
        { concepts: changeTag.concepts },
        { tools: changeTag.tools },
        { topics: changeTag.topics },
      ],
    });
    onClose();
  };

  return (
    <>
      <Modal showDialog={showDialog} title="Edit Info" onClose={onClose}>
        <form action="">
          <input
            type="text"
            onChange={(e) => {
              setChangeTag({ ...changeTag, concepts: e.target.value });
            }}
          />
          <input
            type="text"
            onChange={(e) => {
              setChangeTag({ ...changeTag, tools: e.target.value });
            }}
          />
          <input
            type="text"
            onChange={(e) => {
              setChangeTag({ ...changeTag, topics: e.target.value });
            }}
          />
        </form>
      </Modal>
      {children}
      <section
        className={`grid min-h-0 flex-1 scrollbar-none grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 overflow-x-clip overflow-y-auto`}
      >
        {allVideos
          ?.filter((video) =>
            getSubcategory.length > 0
              ? video.tags.some((subcategory) =>
                  getSubcategory.includes(subcategory.name),
                )
              : true,
          )
          ?.map((video) => (
            <div
              onClick={() => setShowDialog(true)}
              className="relative cursor-pointer"
            >
              <div className="absolute top-1 right-1 z-1 size-8 rounded-full bg-zinc-300"></div>
              <button
                className="border-border bg-border/50 flex h-72 min-w-60 cursor-pointer flex-col justify-between rounded border-2"
                key={video.id}
                onClick={() => window.open(video.url, "_blank")}
              >
                <div className="relative mb-2 h-40 w-full">
                  <Image
                    src={`https://i.ytimg.com/vi/${getYouTubeId(video.url)}/mqdefault.jpg`}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="rounded-t object-cover"
                  />
                </div>
                <div className="grow">
                  <h2 className="mt-1 line-clamp-2 block h-auto w-full rounded px-2 text-center md:text-start">
                    {video.title}
                  </h2>
                  <span className="ml-2 block h-auto w-full rounded text-center text-zinc-400 md:text-start">
                    {video.channelName}
                  </span>
                </div>
                <div className="mx-2 mb-2 flex w-auto flex-wrap gap-2 rounded text-xs">
                  <span className="bg-concept h-auto w-auto rounded px-1 text-zinc-400 ring-1 ring-[#aad97d]">
                    {video.tags[0].name}
                  </span>
                  <span className="bg-tools h-auto w-auto rounded px-1 text-zinc-400 ring-1 ring-[#5a97d6]">
                    {video.tags[1].name}
                  </span>
                  <span className="bg-topics h-auto w-auto rounded px-1 text-zinc-400 ring-1 ring-[#b7a1ff]">
                    {video.tags[2].name}
                  </span>
                </div>
              </button>
            </div>
          ))}
      </section>
    </>
  );
};

export default Main;
