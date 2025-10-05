import { Skeleton } from "@/components/ui/skeleton"

export default function ArticlesLoading() {
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

      {/* 页面内容 */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* 左侧边栏 */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* 搜索卡片 */}
              <div className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>

              {/* 分类卡片 */}
              <div className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="space-y-1">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-2">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <Skeleton className="h-5 w-8 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* 主内容区 */}
          <main className="flex-1 min-w-0">
            {/* 头部 */}
            <section className="mb-8 space-y-4">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-5 w-96" />
            </section>

            {/* 文章列表 */}
            <section className="space-y-12">
              {[...Array(2)].map((_, categoryIndex) => (
                <div key={categoryIndex} className="space-y-6">
                  {/* 分类标题 */}
                  <div className="flex items-center gap-3 pb-4 border-b">
                    <Skeleton className="w-8 h-8 rounded" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-8 w-32" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  </div>

                  {/* 文章网格 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(4)].map((_, articleIndex) => (
                      <div key={articleIndex} className="p-6 border rounded-lg space-y-4">
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-5 w-16" />
                          <Skeleton className="w-8 h-8 rounded" />
                        </div>
                        <Skeleton className="h-6 w-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-4/5" />
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <Skeleton className="h-3 w-24" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                        <div className="flex gap-1.5">
                          <Skeleton className="h-5 w-12" />
                          <Skeleton className="h-5 w-16" />
                          <Skeleton className="h-5 w-14" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
