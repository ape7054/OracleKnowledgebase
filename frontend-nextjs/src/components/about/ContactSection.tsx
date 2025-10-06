'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { socialLinks } from "@/config/about-data"
import { Github, Mail, Twitter, Linkedin } from 'lucide-react'
import { useTranslations } from 'next-intl'

const iconMap: Record<string, any> = {
  Github,
  Mail,
  Twitter,
  Linkedin
}

export function ContactSection() {
  const t = useTranslations('about')

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-6 md:px-8 max-w-4xl space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
          <span>📧</span>
          {t('contact.title')}
        </h2>
        <Card className="border border-border/50 bg-card/50 backdrop-blur">
          <CardContent className="p-8 space-y-6">
            <p className="text-lg text-muted-foreground">
              {t('contact.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon]
                return (
                  <Button
                    key={link.id}
                    variant="outline"
                    className="justify-start h-auto py-4 hover:scale-105 transition-transform"
                    asChild
                  >
                    <a
                      href={link.href}
                      target={link.id !== 'email' ? '_blank' : undefined}
                      rel={link.id !== 'email' ? 'noopener noreferrer' : undefined}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      <div className="text-left flex-1">
                        <div className="font-medium">{link.name}</div>
                        {link.description && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {t(link.description)}
                          </div>
                        )}
                      </div>
                    </a>
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

