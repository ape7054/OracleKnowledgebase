import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { BarChart3 } from '@/lib/icons'
import { useTranslations } from 'next-intl'

export function SkillRadarLoadingSkeleton() {
  const t = useTranslations('about')

  return (
    <Card className="border border-border/50 bg-card/50 backdrop-blur shadow-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          {t('skills.radarChart.title')}
        </CardTitle>
        <CardDescription>
          {t('skills.radarChart.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4 md:pb-6">
        {/* Chart skeleton */}
        <div className="mx-auto aspect-square max-h-[280px] md:max-h-[350px] lg:max-h-[400px] w-full flex items-center justify-center">
          <Skeleton className="w-full h-full rounded-lg" />
        </div>

        {/* Stats panel skeleton */}
        <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center p-2 md:p-3 rounded-lg bg-primary/5 border border-primary/20">
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
                <Skeleton className="h-3 w-20 mx-auto" />
              </div>
            ))}
          </div>
        </div>

        {/* Category list skeleton */}
        <div className="mt-4 md:mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 md:gap-2 p-2 md:p-3 rounded-lg bg-muted/30">
              <Skeleton className="w-6 h-6 rounded" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-5 w-14" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

