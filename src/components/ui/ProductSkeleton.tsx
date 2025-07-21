export default function ProductSkeleton() {
  return (
    <div className="animate-pulse bg-neutral-800 p-4 rounded-xl border border-neutral-700 space-y-4 shadow">
      <div className="h-40 bg-neutral-700/40 rounded" />
      <div className="h-4 bg-neutral-600/40 rounded w-3/4" />
      <div className="h-4 bg-neutral-600/40 rounded w-1/2" />
      <div className="h-8 bg-neutral-600/40 rounded w-full mt-2" />
    </div>
  );
}
