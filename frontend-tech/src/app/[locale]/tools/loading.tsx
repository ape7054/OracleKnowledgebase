import { Skeleton } from "@/components/ui/skeleton"

export default function ToolsLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* 导航栏占位 */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-6 md:px-8">
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

      {/* 头部区域 */}
      <section className="py-16 md:py-20 border-b border-border/40">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="text-center space-y-6">
            <Skeleton className="w-20 h-20 rounded-2xl mx-auto" />
            <Skeleton className="h-12 w-64 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto" />
            <Skeleton className="h-4 w-32 mx-auto" />
          </div>
        </div>
      </section>

      {/* 搜索和筛选区域 */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="space-y-6">
            {/* 搜索框和排序 */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <Skeleton className="h-10 w-full md:max-w-md" />
              <Skeleton className="h-10 w-full md:w-[180px]" />
            </div>

            {/* 分类标签 */}
            <div className="flex flex-wrap gap-2">
              {[...Array(7)].map((_, i) => (
                <Skeleton key={i} className="h-9 w-24" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 工具卡片网格 */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="p-6 border rounded-lg space-y-4">
                {/* 图标和名称 */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-12 h-12 rounded" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </div>

                {/* 描述 */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>

                {/* 标签 */}
                <div className="flex flex-wrap gap-1.5">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-14" />
                </div>

                {/* 按钮 */}
                <div className="flex gap-2">
                  <Skeleton className="h-9 flex-1" />
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
