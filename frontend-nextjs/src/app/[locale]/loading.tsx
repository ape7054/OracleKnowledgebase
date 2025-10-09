import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* 导航栏骨架屏 */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <Skeleton className="h-8 w-24" />
            <div className="hidden md:flex items-center gap-4">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-9 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero区域骨架屏 */}
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-6xl">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <Skeleton className="h-6 w-40 mx-auto rounded-full" />
            <Skeleton className="h-16 w-full max-w-2xl mx-auto" />
            <Skeleton className="h-6 w-full max-w-xl mx-auto" />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Skeleton className="h-12 w-full sm:w-40" />
              <Skeleton className="h-12 w-full sm:w-40" />
            </div>
          </div>
        </div>
      </div>

      {/* 技术栈骨架屏 */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-48 mx-auto mb-2" />
            <Skeleton className="h-6 w-64 mx-auto" />
          </div>
          <div className="flex gap-6 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-44 flex-shrink-0 rounded-xl" />
            ))}
          </div>
        </div>
      </div>

      {/* 知识域卡片骨架屏 */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <Skeleton className="h-12 w-64 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto max-w-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-4 p-6 border border-border/50 rounded-lg bg-card/50">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-10 w-10" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-7 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <div className="flex flex-wrap gap-2 pt-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
