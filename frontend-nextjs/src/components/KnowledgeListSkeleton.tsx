'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function KnowledgeListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-12">
      {[1, 2].map((section) => (
        <div key={section} className="space-y-6">
          {/* 分类标题骨架 */}
          <div className="flex items-center gap-3 pb-4 border-b border-border/40">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-7 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-6 w-12" />
          </div>

          {/* 知识卡片骨架 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count / 2 }).map((_, index) => (
              <Card key={index} className="border border-border/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                  </div>
                  
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-border/40">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-14" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

