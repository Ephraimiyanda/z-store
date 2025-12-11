import { Skeleton } from "./ui/skeleton";

interface ProductSkeletonProps {
  count?: number;
  className?: string;
}

export function ProductCardSkeleton({
  count = 1,
  className = "",
}: ProductSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`flex flex-col gap-3 pb-4 md:min-h-78 animate-pulse ${className}`}
        >
          <Skeleton className="w-full aspect-square bg-gray-200" />
          <Skeleton className="w-10 h-10 mx-auto bg-gray-200 rounded-none" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-24 bg-gray-200" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-2/3 bg-gray-200" />
              <Skeleton className="h-5 w-12 bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
