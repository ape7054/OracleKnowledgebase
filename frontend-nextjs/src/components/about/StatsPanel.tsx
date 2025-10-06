'use client'

import { Card, CardContent } from "@/components/ui/card"
import { stats } from "@/config/about-data"
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

export function StatsPanel() {
  const t = useTranslations('about')
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-6 md:px-8 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <Card
              key={stat.id}
              className="border border-border/50 hover:shadow-lg transition-all hover:-translate-y-1"
              style={{
                animation: isVisible
                  ? `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  : 'none'
              }}
            >
              <CardContent className="p-6 text-center space-y-2">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold tracking-tight">
                  {stat.number}
                </div>
                <div className="text-sm font-medium">{t(stat.label)}</div>
                <div className="text-xs text-muted-foreground">
                  {t(stat.description)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}

