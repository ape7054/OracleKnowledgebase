'use client';

import { ReactNode } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
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
        <ResizablePanelGroup direction="horizontal" className="min-h-screen">
          {/* 左侧：目录 */}
          {showToc && tableOfContents && (
            <>
              <ResizablePanel
                defaultSize={20}
                minSize={15}
                maxSize={25}
                className="pr-4"
              >
                <div className="sticky top-20">
                  <ScrollArea className="h-[calc(100vh-8rem)]">
                    {tableOfContents}
                  </ScrollArea>
                </div>
              </ResizablePanel>
              <ResizableHandle className="w-px bg-border" />
            </>
          )}

          {/* 中间：主内容 */}
          <ResizablePanel
            defaultSize={showToc && showSidebar ? 55 : showToc || showSidebar ? 75 : 100}
            minSize={40}
          >
            <article className="prose prose-gray dark:prose-invert max-w-none px-8">
              {children}
            </article>
          </ResizablePanel>

          {/* 右侧：边栏 */}
          {showSidebar && sidebar && (
            <>
              <ResizableHandle className="w-px bg-border" />
              <ResizablePanel
                defaultSize={25}
                minSize={20}
                maxSize={30}
                className="pl-4"
              >
                <div className="sticky top-20">
                  <ScrollArea className="h-[calc(100vh-8rem)]">
                    {sidebar}
                  </ScrollArea>
                </div>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>

      {/* 平板端：两栏布局（主内容 + 可选目录） */}
      <div className="hidden md:block lg:hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* 左侧：目录 */}
          {showToc && tableOfContents && (
            <>
              <ResizablePanel
                defaultSize={25}
                minSize={20}
                maxSize={35}
                className="pr-4"
              >
                <div className="sticky top-20">
                  <ScrollArea className="h-[calc(100vh-8rem)]">
                    {tableOfContents}
                  </ScrollArea>
                </div>
              </ResizablePanel>
              <ResizableHandle className="w-px bg-border" />
            </>
          )}

          {/* 主内容 */}
          <ResizablePanel defaultSize={75} minSize={60}>
            <article className="prose prose-gray dark:prose-invert max-w-none px-6">
              {children}
            </article>
            {/* 右侧边栏内容移到文章底部 */}
            {showSidebar && sidebar && (
              <div className="mt-12 border-t pt-8">
                {sidebar}
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
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
        <article className="prose prose-gray dark:prose-invert max-w-none">
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