'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SiteHeader } from '@/components/SiteHeader';
import { useTranslations } from 'next-intl';
import { Smartphone, Tablet, Monitor, Check } from 'lucide-react';
import Link from 'next/link';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

export default function ResponsivePage() {
  const t = useTranslations('demo.responsive');
  const [currentDevice, setCurrentDevice] = useState<DeviceType>('desktop');

  const devices = [
    { id: 'mobile' as DeviceType, icon: Smartphone, width: '375px', label: t('devices.mobile') },
    { id: 'tablet' as DeviceType, icon: Tablet, width: '768px', label: t('devices.tablet') },
    { id: 'desktop' as DeviceType, icon: Monitor, width: '100%', label: t('devices.desktop') },
  ];

  const breakpoints = [
    { key: 'sm', value: t('breakpoints.sm') },
    { key: 'md', value: t('breakpoints.md') },
    { key: 'lg', value: t('breakpoints.lg') },
    { key: 'xl', value: t('breakpoints.xl') },
    { key: '2xl', value: t('breakpoints.2xl') },
  ];

  const features = [
    { key: 'touch', icon: '👆' },
    { key: 'viewport', icon: '📱' },
    { key: 'orientation', icon: '🔄' },
    { key: 'performance', icon: '⚡' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container mx-auto px-4 max-w-7xl py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Monitor className="h-3 w-3 mr-1" />
            Responsive Design
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('title')}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Device Selector */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Device Preview</CardTitle>
              <CardDescription>
                Switch between different device sizes to see responsive design
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Device Buttons */}
              <div className="flex gap-2 justify-center flex-wrap">
                {devices.map((device) => {
                  const Icon = device.icon;
                  return (
                    <Button
                      key={device.id}
                      onClick={() => setCurrentDevice(device.id)}
                      variant={currentDevice === device.id ? 'default' : 'outline'}
                      className="gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      {device.label}
                    </Button>
                  );
                })}
              </div>

              {/* Device Frame */}
              <div className="w-full flex justify-center">
                <div
                  className={`border-4 border-muted rounded-lg overflow-hidden transition-all duration-300 bg-background shadow-lg ${
                    currentDevice === 'mobile' ? 'w-[375px]' :
                    currentDevice === 'tablet' ? 'w-[768px]' :
                    'w-full'
                  } max-w-full`}
                >
                  {/* Mock Content */}
                  <div className="p-6 space-y-4">
                    <div className="h-8 bg-primary/20 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-full"></div>
                      <div className="h-4 bg-muted rounded w-5/6"></div>
                      <div className="h-4 bg-muted rounded w-4/5"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[1, 2, 3].map((item) => (
                        <div
                          key={item}
                          className="h-24 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center"
                        >
                          <span className="text-sm font-medium">Item {item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Breakpoints */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>{t('breakpoints.title')}</CardTitle>
              <CardDescription>
                Tailwind CSS responsive breakpoints used in this project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {breakpoints.map((bp) => (
                  <div
                    key={bp.key}
                    className="p-4 rounded-lg border-2 border-primary/20 bg-primary/5 text-center"
                  >
                    <div className="text-xs font-medium text-muted-foreground uppercase mb-1">
                      {bp.key}
                    </div>
                    <div className="text-lg font-bold">{bp.value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Mobile Features */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>{t('features.title')}</CardTitle>
              <CardDescription>
                Mobile-specific optimizations and features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div
                    key={feature.key}
                    className="flex items-start gap-4 p-4 rounded-lg border hover:border-primary/50 transition-colors"
                  >
                    <div className="text-3xl">{feature.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">
                        {t(`features.${feature.key}`)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Optimized for mobile devices with touch-friendly interactions
                      </p>
                    </div>
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Responsive Examples */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Responsive Grid Examples</CardTitle>
              <CardDescription>
                Grid layouts that adapt to different screen sizes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* 1 Column -> 2 Columns -> 4 Columns */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">
                    1 col → 2 cols → 4 cols
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="h-20 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg flex items-center justify-center"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 1 Column -> 3 Columns */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">
                    1 col → 3 cols
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="h-20 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg flex items-center justify-center"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Asymmetric Grid */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">
                    Asymmetric Layout
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 h-32 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg flex items-center justify-center">
                      2/3 Width
                    </div>
                    <div className="h-32 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg flex items-center justify-center">
                      1/3 Width
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Perfect on Every Device
              </h3>
              <p className="text-muted-foreground mb-6">
                Every page in this project is fully responsive and optimized for all screen sizes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/frontend">
                  <Button size="lg" variant="outline">
                    Back to Demos
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

