import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  className?: string
  title?: string
  subtitle?: string
  primaryCtaText?: string
  secondaryCtaText?: string
}

export function HeroSection({
  className,
  title = "One-click for Asset Defense",
  subtitle = "Innovative blockchain technology meets financial expertise.",
  primaryCtaText = "Open App",
  secondaryCtaText = "Discover More",
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden isolate min-h-[72vh] flex items-center",
        "bg-background text-foreground",
        className
      )}
    >
      {/* 背景模糊渐变 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(1200px 600px at 70% 30%, hsl(var(--primary)/0.15), transparent 60%), radial-gradient(800px 400px at 20% 70%, hsl(var(--accent)/0.18), transparent 60%)",
          filter: "blur(20px)",
        }}
      />

      {/* 渐变光带 */}
      <div
        aria-hidden
        className="absolute left-1/2 top-[-10%] h-[50rem] w-[50rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="container mx-auto px-6 md:px-8 max-w-6xl">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs text-muted-foreground">
            DeFi Security
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {title}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            {subtitle}
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Button size="lg">{primaryCtaText}</Button>
            <Button size="lg" variant="outline">
              {secondaryCtaText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 