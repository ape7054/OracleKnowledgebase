import { SiteHeader } from '@/components/SiteHeader'
import { KnowledgeListSkeleton } from '@/components/KnowledgeListSkeleton'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* 面包屑骨架 */}
        <div className="mb-4">
          <Skeleton className="h-4 w-48" />
        </div>

        <div className="flex gap-8">
          {/* 左侧边栏骨架 */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <Skeleton className="h-4 w-24 mb-3" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </aside>

          {/* 主内容区骨架 */}
          <main className="flex-1 min-w-0">
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-10 w-32" />
              </div>
              <Skeleton className="h-5 w-96" />
            </section>

            <KnowledgeListSkeleton />
          </main>
        </div>
      </div>
    </div>
  )
}
