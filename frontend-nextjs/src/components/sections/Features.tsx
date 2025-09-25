import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FeatureItem {
  title: string
  description: string
  icon?: React.ReactNode
}

interface FeaturesProps {
  items?: FeatureItem[]
}

export function Features({
  items = [
    {
      title: "Real-time Monitoring",
      description: "Proactive on-chain risk detection with automated alerts.",
    },
    {
      title: "Multi-chain Support",
      description: "Seamless integration across major L1s and L2s.",
    },
    {
      title: "Institutional-grade Security",
      description: "Battle-tested security posture for digital assets.",
    },
  ],
}: FeaturesProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-8 max-w-6xl">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Powerful Features
          </h2>
          <p className="text-muted-foreground">
            Built for performance, security and scale.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it, idx) => (
            <Card key={idx} className="border-border/60">
              <CardHeader>
                <CardTitle className="text-lg">{it.title}</CardTitle>
                <CardDescription>{it.description}</CardDescription>
              </CardHeader>
              <CardContent>{it.icon}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 