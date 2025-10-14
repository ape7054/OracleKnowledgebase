'use client';

import { ReactNode } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';


interface ArticleLayoutProps {
  // 左侧目录
  tableOfContents?: ReactNode;
  // 中间主内容
  children: ReactNode;
  // 右侧边栏
  sidebar?: ReactNode;
  // 是否显示左侧目录
  showToc?: boolean;
  // 是否显示右侧边栏
  showSidebar?: boolean;
}

export function ArticleLayout({
  tableOfContents,
  children,
  sidebar,
  showToc = true,
  showSidebar = true,
}: ArticleLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 桌面端：三栏布局 */}
      <div className="hidden lg:block">
        <div className="flex gap-4">
          {/* 左侧：目录 - 固定定位 */}
          {showToc && tableOfContents && (
            <div className="w-64 flex-shrink-0">
              <div className="sticky top-20">
                <ScrollArea className="h-[calc(100vh-6rem)]">
                  {tableOfContents}
                </ScrollArea>
              </div>
            </div>
          )}

          {/* 中间：主内容 */}
          <div className="flex-1 min-w-0 px-8">
            <article>
              {children}
            </article>
          </div>

          {/* 右侧：边栏 - 固定定位 */}
          {showSidebar && sidebar && (
            <div className="w-80 flex-shrink-0">
              <div className="sticky top-20">
                <ScrollArea className="h-[calc(100vh-6rem)]">
                  {sidebar}
                </ScrollArea>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 平板端：两栏布局（主内容 + 可选目录） */}
      <div className="hidden md:block lg:hidden">
        <div className="flex gap-4">
          {/* 左侧：目录 */}
          {showToc && tableOfContents && (
            <div className="w-56 flex-shrink-0">
              <div className="sticky top-20">
                <ScrollArea className="h-[calc(100vh-6rem)]">
                  {tableOfContents}
                </ScrollArea>
              </div>
            </div>
          )}

          {/* 主内容 */}
          <div className="flex-1 min-w-0 px-6">
            <article>
              {children}
            </article>
            {/* 右侧边栏内容移到文章底部 */}
            {showSidebar && sidebar && (
              <div className="mt-12 border-t pt-8">
                {sidebar}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 移动端：单栏布局 */}
      <div className="block md:hidden">
        {/* 可展开的目录 */}
        {showToc && tableOfContents && (
          <details className="mb-8 rounded-lg border p-4">
            <summary className="cursor-pointer font-semibold flex items-center justify-between">
              目录
              <span className="text-muted-foreground text-sm">点击展开</span>
            </summary>
            <div className="mt-4">
              {tableOfContents}
            </div>
          </details>
        )}

        {/* 主内容 */}
        <article>
          {children}
        </article>

        {/* 边栏内容移到底部 */}
        {showSidebar && sidebar && (
          <div className="mt-12 border-t pt-8">
            {sidebar}
          </div>
        )}
      </div>
    </div>
  );
} 