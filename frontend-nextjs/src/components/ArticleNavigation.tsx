'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ArticleNavLink {
  slug: string;
  title: string;
  description?: string;
}

interface ArticleNavigationProps {
  prev?: ArticleNavLink;
  next?: ArticleNavLink;
  locale: string;
  prevLabel?: string;
  nextLabel?: string;
}

export function ArticleNavigation({ 
  prev, 
  next, 
  locale,
  prevLabel = '上一篇',
  nextLabel = '下一篇'
}: ArticleNavigationProps) {
  if (!prev && !next) {
    return null;
  }

  return (
    <nav className="mt-16 pt-8 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 上一篇 */}
        {prev ? (
          <Link
            href={`/${locale}/articles/${prev.slug}`}
            className="group block"
          >
            <Card className="h-full p-6 transition-all hover:shadow-lg hover:border-primary/50">
              <div className="flex items-start gap-3">
                <ArrowLeft className="w-5 h-5 mt-1 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    {prevLabel}
                  </p>
                  <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors line-clamp-2">
                    {prev.title}
                  </h3>
                  {prev.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {prev.description}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </Link>
        ) : (
          <div /> // 占位，保持右侧对齐
        )}

        {/* 下一篇 */}
        {next && (
          <Link
            href={`/${locale}/articles/${next.slug}`}
            className="group block"
          >
            <Card className="h-full p-6 transition-all hover:shadow-lg hover:border-primary/50">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0 text-right">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    {nextLabel}
                  </p>
                  <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors line-clamp-2">
                    {next.title}
                  </h3>
                  {next.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {next.description}
                    </p>
                  )}
                </div>
                <ArrowRight className="w-5 h-5 mt-1 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </div>
            </Card>
          </Link>
        )}
      </div>
    </nav>
  );
} 