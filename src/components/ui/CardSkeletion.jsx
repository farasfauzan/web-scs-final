import Skeleton from "./Skeleton";

export default function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-neutral-300 overflow-hidden flex flex-col shadow-sm">
      <Skeleton className="w-full h-52 rounded-none" />
      <div className="p-6 flex flex-col gap-4">
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-3/4 h-6" />
        <div className="mt-2 flex flex-col gap-2">
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-5/6 h-3" />
        </div>
      </div>
    </div>
  );
}