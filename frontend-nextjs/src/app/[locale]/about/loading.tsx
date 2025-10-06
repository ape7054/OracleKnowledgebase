import { Skeleton } from "@/components/ui/skeleton"

export default function AboutLoading() {
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

      {/* Hero Section 占位 */}
      <section className="py-16 md:py-24 border-b border-border/40">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl">
          <div className="text-center space-y-6">
            <Skeleton className="w-24 h-24 rounded-full mx-auto" />
            <Skeleton className="h-12 w-64 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto" />
            <div className="flex items-center justify-center gap-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="flex items-center justify-center gap-3 pt-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-10 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Panel 占位 */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-6 border rounded-lg space-y-2 bg-card">
                <Skeleton className="h-8 w-8 mx-auto" />
                <Skeleton className="h-10 w-16 mx-auto" />
                <Skeleton className="h-4 w-24 mx-auto" />
                <Skeleton className="h-3 w-32 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Timeline 占位 */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl">
          <Skeleton className="h-10 w-48 mb-12" />
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="md:ml-20 p-6 border rounded-lg space-y-4 bg-card">
                <div className="flex items-center gap-3 flex-wrap">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-48" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(5)].map((_, j) => (
                    <Skeleton key={j} className="h-5 w-16" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skill Matrix 占位 */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl">
          <Skeleton className="h-10 w-48 mb-12" />
          <div className="space-y-4 mb-8">
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-12" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Purpose 占位 */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl space-y-8">
          <Skeleton className="h-10 w-48" />
          <div className="p-8 border rounded-lg space-y-4 bg-card">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </section>

      {/* Value 占位 */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl space-y-8">
          <Skeleton className="h-10 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-6 border rounded-lg space-y-3 bg-card">
                <Skeleton className="w-8 h-8" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Topics 占位 */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl space-y-8">
          <Skeleton className="h-10 w-48" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="p-4 border rounded-lg bg-card">
                <Skeleton className="h-5 w-20 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact 占位 */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl space-y-8">
          <Skeleton className="h-10 w-48" />
          <div className="p-8 border rounded-lg space-y-6 bg-card">
            <Skeleton className="h-6 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA 占位 */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl">
          <div className="p-12 border rounded-lg space-y-6 bg-card">
            <Skeleton className="h-8 w-64 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto" />
            <div className="flex items-center justify-center gap-4">
              <Skeleton className="h-11 w-32" />
              <Skeleton className="h-11 w-32" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
