import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function ViewCardsSkeleton({
  children,
  count,
}: {
  children?: React.ReactNode;
  count: number;
}) {
  return (
    <>
      <SkeletonTheme baseColor="#1e2d3d" highlightColor="#295F99">
        {Array.from({ length: count }).map((_, index) => (
          <div className="relative" key={index}>
            <div className="bg-border/50 relative flex h-72 min-w-60 cursor-pointer flex-col justify-between rounded">
              <div className="relative mb-2 h-40 w-full">
                <Skeleton height={150} />
              </div>
              <div className="grow">
                <h2 className="mt-1 line-clamp-2 block h-auto w-full rounded px-2 text-center md:text-start">
                  <Skeleton width={200} height={20} />
                </h2>
                <span className="ml-2 block h-auto w-full rounded text-center text-zinc-400 md:text-start">
                  <Skeleton width={150} height={15} />
                </span>
              </div>
              <div className="mx-2 mb-2 flex w-auto flex-wrap gap-2 rounded text-xs">
                <span className="h-auto w-auto rounded px-1 text-zinc-400">
                  <Skeleton
                    width={80}
                    height={15}
                    baseColor=" #192c0e"
                    highlightColor="#aad97d"
                  />
                </span>
                <span className="h-auto w-auto rounded px-1 text-zinc-400">
                  <Skeleton
                    width={80}
                    height={15}
                    baseColor=" #0e2c3b"
                    highlightColor="#5a97d6"
                  />
                </span>
                <span className="h-auto w-auto rounded px-1">
                  <Skeleton
                    width={80}
                    height={15}
                    baseColor=" #2c0e2c"
                    highlightColor="#b7a1ff"
                  />
                </span>
              </div>
            </div>
          </div>
        ))}
      </SkeletonTheme>
    </>
  );
}

export default ViewCardsSkeleton;
