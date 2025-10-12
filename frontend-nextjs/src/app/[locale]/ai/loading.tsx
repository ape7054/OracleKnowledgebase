import { Skeleton } from "@/components/ui/skeleton"
import { SiteHeader } from "@/components/SiteHeader"
import { Separator } from "@/components/ui/separator"

export default function AIPageLoading() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      {/* 头部骨架 */}
      <section className="py-12 md:py-16 lg:py-20 border-b border-border/40">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
          <div className="text-center space-y-4 md:space-y-6">
            <Skeleton className="w-16 h-16 md:w-20 md:h-20 rounded-2xl mx-auto" />
            <Skeleton className="h-10 md:h-12 w-64 md:w-96 mx-auto" />
            <Skeleton className="h-6 w-96 max-w-full mx-auto" />
            <Skeleton className="h-4 w-32 mx-auto" />
          </div>
        </div>
      </section>

      <Separator />

      {/* 主内容骨架 */}
      <section className="py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
          {/* Tabs 骨架 */}
          <div className="flex gap-2 mb-6 md:mb-8">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-28" />
          </div>

          {/* 卡片网格骨架 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4 p-6 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
                <Skeleton className="h-12 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-9 flex-1" />
                  <Skeleton className="h-9 w-9" />
                  <Skeleton className="h-9 w-9" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

