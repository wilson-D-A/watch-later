import Image from "next/image";

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
  return (
    <button
      className="border-border bg-border/50 flex h-72 min-w-60 cursor-pointer flex-col justify-between rounded border-2"
      key={id}
      onClick={() => window.open(url, "_blank")}
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
    </button>
  );
}

export default ViewCards;
