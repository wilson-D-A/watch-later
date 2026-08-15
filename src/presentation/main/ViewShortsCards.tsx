import UsePatchTagContainer from "@/interaction/UsePatchTagContainer";
import Image from "next/image";
function ViewShortsCards({
  children,
  id,
  url,
  title,
  channelName,
  concept,
  tools,
  topics,
  thumbnail,
}: {
  children?: React.ReactNode;
  id: number;
  url: string;
  title: string;
  channelName: string;
  concept: string;
  tools: string;
  topics: string;
  thumbnail: string;
}) {
  return (
    <div
      className="relative"

      key={id}
    >
      <div
        onClick={() => {
          console.log("url", id);
          window.open(url, "_blank");
        }}
        className="border-border bg-border/50 relative flex h-72 min-w-50 cursor-pointer justify-evenly rounded border-2"
      >
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="mx-2 mt-2 line-clamp-2 block h-auto max-w-full rounded text-center md:text-start">
              {title}
            </h2>
            <span className="ml-2 block h-auto w-full rounded text-center text-zinc-400 md:text-start">
              {channelName}
            </span>
          </div>

          <div className="mb-2 ml-2 flex max-w-full flex-col gap-2 rounded text-xs">
            {concept && (
              <span className="bg-concept h-auto w-auto rounded px-1 text-zinc-400 ring-1 ring-[#aad97d]">
                {concept}
              </span>
            )}
            {tools && (
              <span className="bg-tools h-auto w-full rounded px-1 text-zinc-400 ring-1 ring-[#5a97d6]">
                {tools}
              </span>
            )}
            {topics && (
              <span className="bg-topics h-auto w-full rounded px-1 text-zinc-400 ring-1 ring-[#b7a1ff]">
                {topics}
              </span>
            )}
            <UsePatchTagContainer
              id={id}
              concept={concept}
              tools={tools}
              topics={topics}
              position={{
                delete: "absolute top-2 right-1",
                edit: "absolute top-11 right-1",
              }}
            />
          </div>
        </div>
        <div className="relative mb-2 h-full min-w-[50%] rounded-t">
          <Image
            src={thumbnail}
            loading="lazy"
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="rounded-r-sm object-cover pl-2"
          />
        </div>
      </div>
    </div>
  );
}

export default ViewShortsCards;
