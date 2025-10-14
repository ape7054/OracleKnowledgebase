'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface TocItem {
  id: string;
  title: string;
  level: number; // 1-6 对应 h1-h6
}

interface TableOfContentsProps {
  items?: TocItem[];
}

// 将文本转换为 URL 友好的 slug（支持中文）
function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    // 保留中文、英文、数字，其他字符替换为连字符
    .replace(/[^\u4e00-\u9fa5a-z0-9]+/gi, '-')
    // 移除首尾的连字符
    .replace(/^-+|-+$/g, '');
}

export function TableOfContents({ items: providedItems }: TableOfContentsProps) {
  const [items, setItems] = useState<TocItem[]>(providedItems || []);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // 如果没有提供 items，从页面 DOM 中提取并自动添加 id
    if (!providedItems || providedItems.length === 0) {
      const article = document.querySelector('article');
      if (!article) return;

      const headings = article.querySelectorAll('h2, h3');
      const tocItems: TocItem[] = [];
      const usedIds = new Set<string>(); // 跟踪已使用的 id

      headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName[1]);
        const title = heading.textContent?.trim() || '';
        let id = heading.id;

        // 如果标题没有 id，自动生成一个
        if (!id) {
          let baseId = slugify(title);
          
          // 如果 slugify 后为空，使用索引
          if (!baseId) {
            baseId = `heading-${index}`;
          }
          
          // 确保 id 唯一
          id = baseId;
          let counter = 1;
          while (usedIds.has(id)) {
            id = `${baseId}-${counter}`;
            counter++;
          }
          
          heading.id = id;
        }

        usedIds.add(id);
        tocItems.push({ id, title, level });
      });

      setItems(tocItems);
    }
  }, [providedItems]);

  useEffect(() => {
    if (items.length === 0) return;

    // 监听滚动，自动高亮当前章节
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    // 观察所有标题元素
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const top = element.offsetTop - 100; // 距顶部 100px
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav className="space-y-1">
      <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
        目录
      </h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 1) * 0.75}rem` }}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                'block text-sm transition-colors hover:text-foreground',
                activeId === item.id
                  ? 'text-primary font-medium border-l-2 border-primary pl-3 -ml-[2px]'
                  : 'text-muted-foreground hover:border-l-2 hover:border-border pl-3 -ml-[2px]'
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// 工具函数：从 Markdown 内容提取标题
export function extractHeadings(content: string): TocItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
      .replace(/^-|-$/g, '');

    headings.push({ id, title, level });
  }

  return headings;
} 