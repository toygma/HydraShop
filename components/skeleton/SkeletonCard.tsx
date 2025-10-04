const ProductCardSkeleton = () => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden w-full">
      {/* Image Skeleton */}
      <div className="relative w-full h-72 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </div>

      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 animate-pulse" />
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2 animate-pulse" />
        </div>

        {/* Rating Skeleton */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
              />
            ))}
          </div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
        </div>

        {/* Price Skeleton */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-1">
            <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse" />
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-full animate-pulse mt-4" />
      </div>
    </div>
  );
};

export const ProductsSkeletonGrid = ({ count }:{count:number}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(count)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

