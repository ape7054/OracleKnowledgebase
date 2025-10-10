import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Rocket } from '@/lib/icons'
import { useTranslations } from 'next-intl'

export function ProjectCarouselLoadingSkeleton() {
  const t = useTranslations('about')

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Rocket className="w-6 h-6" />
          </div>
          {t('projects.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="border border-border/50">
              <CardContent className="p-6 space-y-4">
                {/* Title skeleton */}
                <div className="space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>

                {/* Tech badges skeleton */}
                <div className="flex flex-wrap gap-1.5">
                  {[...Array(4)].map((_, j) => (
                    <Skeleton key={j} className="h-5 w-16" />
                  ))}
                </div>

                {/* Buttons skeleton */}
                <div className="flex items-center gap-2 pt-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-24 ml-auto" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

