import Image from "next/image";
import { useState } from "react";
import usePatchTags from "../../hooks/services/usePatchTags";
import Modal from "../Modal";
function ViewCards({
  id,
  url,
  title,
  channelName,
  concept,
  tools,
  topics,
  getYouTubeId,
}: {
  id: number;
  url: string;
  title: string;
  channelName: string;
  concept: string;
  tools: string;
  topics: string;
  getYouTubeId: (url: string) => string | null;
}) {
  const [showDialog, setShowDialog] = useState(false);
  const [changeTag, setChangeTag] = useState<{ [key: string]: string }>({
    concept: "",
    tool: "",
    topic: "",
  });
  const mutate = usePatchTags();

  const onClose = () => {
    setShowDialog(false);
    setChangeTag({
      concept: "",
      tool: "",
      topic: "",
    });
  };
  const nextTags = {
    concept: changeTag.concept || concept,
    tool: changeTag.tool || tools,
    topic: changeTag.topic || topics,
  };
  const onOk = (id: number) => {
    mutate.mutate({
      id,
      tags: nextTags,
    });

    onClose();
  };

  return (
    <div className="relative" key={id}>
      <button
        className="absolute top-2 right-2 z-10 flex size-7 cursor-pointer gap-2 rounded-full bg-zinc-300/75 px-1 py-1 text-xs"
        onClick={(e) => {
          setShowDialog(true);
          e.stopPropagation();
        }}
      >
        {" "}
      </button>

      <Modal
        onOk={() => onOk(id)}
        showDialog={showDialog}
        title="Edit Video Tags"
        onClose={onClose}
      >
        <form action="">
          <h1>concept</h1>

          <input
            placeholder={concept}
            className="bg-concept mb-2 w-full rounded px-2 py-1 text-zinc-300 inset-ring-1 inset-ring-[#aad97d] outline-none"
            type="text"

            onChange={(e) => {
              setChangeTag({ ...changeTag, concept: e.target.value });
            }}
          />
          <h1>tools</h1>

          <input
            placeholder={tools}
            className="border-border bg-tools inset-1ring-1 mb-2 w-full rounded border-2 px-2 py-1 text-zinc-300 inset-ring-1 inset-ring-[#5a97d6] outline-none"
            type="text"
            onChange={(e) => {
              setChangeTag({ ...changeTag, tool: e.target.value });
            }}
          />
          <h1>topics</h1>
          <input
            placeholder={topics}
            className="border-border bg-topics inset-0 mb-2 w-full rounded border-2 px-2 py-1 text-zinc-300 inset-ring-1 inset-ring-[#b7a1ff] outline-none"
            type="text"
            onChange={(e) => {
              setChangeTag({ ...changeTag, topic: e.target.value });
            }}
          />
        </form>
      </Modal>

      <div
        onClick={() => {
          window.open(url, "_blank");
        }}
        className="border-border bg-border/50 relative flex h-72 min-w-60 cursor-pointer flex-col justify-between rounded border-2"
      >
        <div className="relative mb-2 h-40 w-full">
          <Image
            src={`https://i.ytimg.com/vi/${getYouTubeId(url)}/mqdefault.jpg`}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="rounded-t object-cover"
          />
        </div>
        <div className="grow">
          <h2 className="mt-1 line-clamp-2 block h-auto w-full rounded px-2 text-center md:text-start">
            {title}
          </h2>
          <span className="ml-2 block h-auto w-full rounded text-center text-zinc-400 md:text-start">
            {channelName}
          </span>
        </div>
        <div className="mx-2 mb-2 flex w-auto flex-wrap gap-2 rounded text-xs">
          <span className="bg-concept h-auto w-auto rounded px-1 text-zinc-400 ring-1 ring-[#aad97d]">
            {concept}
          </span>
          <span className="bg-tools h-auto w-auto rounded px-1 text-zinc-400 ring-1 ring-[#5a97d6]">
            {tools}
          </span>
          <span className="bg-topics h-auto w-auto rounded px-1 text-zinc-400 ring-1 ring-[#b7a1ff]">
            {topics}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ViewCards;
