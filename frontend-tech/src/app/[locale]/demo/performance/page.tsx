'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { SiteHeader } from '@/components/SiteHeader';
import {
  Zap,
  TrendingUp,
  Image as ImageIcon,
  Package,
  Eye,
  CheckCircle2,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function PerformancePage() {
  const t = useTranslations('demo.performance');
  const [showComparison, setShowComparison] = useState(false);

  // Lighthouse scores
  const lighthouseScores = [
    { key: 'performance', score: 96, color: 'text-green-500' },
    { key: 'accessibility', score: 100, color: 'text-green-500' },
    { key: 'bestPractices', score: 100, color: 'text-green-500' },
    { key: 'seo', score: 100, color: 'text-green-500' },
  ];

  // Web Vitals data
  const webVitals = [
    { key: 'lcp', value: '1.2s', status: 'good', threshold: '< 2.5s' },
    { key: 'fid', value: '8ms', status: 'good', threshold: '< 100ms' },
    { key: 'cls', value: '0.05', status: 'good', threshold: '< 0.1' },
    { key: 'ttfb', value: '180ms', status: 'good', threshold: '< 600ms' },
  ];

  // Comparison data
  const comparisons = [
    {
      key: 'imageOptimization',
      before: { size: '2.5 MB', time: '3.2s' },
      after: { size: '180 KB', time: '0.4s' },
      improvement: '92%',
    },
    {
      key: 'codeSplitting',
      before: { size: '850 KB', time: '2.8s' },
      after: { size: '320 KB', time: '0.9s' },
      improvement: '62%',
    },
    {
      key: 'lazyLoading',
      before: { size: '680 KB', time: '2.1s' },
      after: { size: '280 KB', time: '0.7s' },
      improvement: '58%',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'needsImprovement':
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'poor':
        return 'text-red-500 bg-red-500/10 border-red-500/20';
      default:
        return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container mx-auto px-4 max-w-7xl py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Zap className="h-3 w-3 mr-1" />
            Performance Optimization
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('title')}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Lighthouse Scores */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            {t('lighthouse.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lighthouseScores.map((metric) => (
              <Card key={metric.key} className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium">
                      {t(`lighthouse.${metric.key}`)}
                    </span>
                    <CheckCircle2 className={`h-5 w-5 ${metric.color}`} />
                  </div>
                  <div className="space-y-2">
                    <div className={`text-4xl font-bold ${metric.color}`}>
                      {metric.score}
                    </div>
                    <Progress value={metric.score} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Web Vitals */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Eye className="h-6 w-6 text-primary" />
            {t('webVitals.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {webVitals.map((vital) => (
              <Card key={vital.key}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>{t(`webVitals.${vital.key}`)}</span>
                    <Badge className={getStatusColor(vital.status)} variant="outline">
                      {t(`webVitals.${vital.status}`)}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-green-500">
                      {vital.value}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {vital.threshold}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Optimization Comparison */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Package className="h-6 w-6 text-primary" />
              {t('comparison.title')}
            </h2>
            <Button
              onClick={() => setShowComparison(!showComparison)}
              variant="outline"
              size="sm"
            >
              {showComparison ? 'Hide' : 'Show'} Details
              <ChevronRight
                className={`ml-2 h-4 w-4 transition-transform ${
                  showComparison ? 'rotate-90' : ''
                }`}
              />
            </Button>
          </div>

          {showComparison && (
            <div className="space-y-6">
              {comparisons.map((comparison) => (
                <Card key={comparison.key}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>{t(`comparison.${comparison.key}`)}</span>
                      <Badge variant="secondary" className="text-green-500">
                        ↓ {comparison.improvement}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">
                          {t('comparison.before')}
                        </div>
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <div className="text-sm">
                            <div>
                              {t('comparison.bundleSize')}: {comparison.before.size}
                            </div>
                            <div>
                              {t('comparison.loadTime')}: {comparison.before.time}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">
                          {t('comparison.after')}
                        </div>
                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <div className="text-sm">
                            <div>
                              {t('comparison.bundleSize')}: {comparison.after.size}
                            </div>
                            <div>
                              {t('comparison.loadTime')}: {comparison.after.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Optimization Techniques */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <ImageIcon className="h-6 w-6 text-primary" />
            {t('techniques.title')}
          </h2>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-3">
                {t.raw('techniques.items').map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Want to learn more about performance optimization?
              </h3>
              <p className="text-muted-foreground mb-6">
                Check out my technical articles on performance best practices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/knowledge">
                  <Button size="lg" className="gap-2">
                    Read Articles
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="gap-2">
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

