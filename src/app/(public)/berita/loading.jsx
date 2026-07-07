import CardSkeleton from "@/components/ui/CardSkeleton";

export default function LoadingBerita() {
  return (
    <div className="w-full bg-zinc-100 min-h-screen py-32 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}