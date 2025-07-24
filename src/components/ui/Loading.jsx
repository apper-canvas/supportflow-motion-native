import { cn } from "@/utils/cn"

const Loading = ({ className, variant = "default" }) => {
  if (variant === "table") {
    return (
      <div className={cn("space-y-4", className)}>
        {/* Table Header Skeleton */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-32 animate-pulse"></div>
              <div className="h-10 bg-gradient-to-r from-primary-200 to-primary-300 rounded-md w-32 animate-pulse"></div>
            </div>
          </div>
          
          {/* Table Rows Skeleton */}
          <div className="divide-y divide-gray-200">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="h-6 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full w-16 animate-pulse"></div>
                    <div className="h-6 bg-gradient-to-r from-orange-200 to-orange-300 rounded-full w-16 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (variant === "cards") {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 animate-pulse"></div>
                <div className="h-6 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full w-20 animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-24 animate-pulse"></div>
                <div className="h-6 bg-gradient-to-r from-orange-200 to-orange-300 rounded-full w-16 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Default skeleton
  return (
    <div className={cn("space-y-4", className)}>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="space-y-4">
          <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-5/6 animate-pulse"></div>
          <div className="flex space-x-4">
            <div className="h-6 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full w-20 animate-pulse"></div>
            <div className="h-6 bg-gradient-to-r from-orange-200 to-orange-300 rounded-full w-16 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading