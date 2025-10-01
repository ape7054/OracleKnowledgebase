'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Eye, Tag } from 'lucide-react';
import Link from 'next/link';

interface ArticleMetadata {
  publishDate?: string;
  updateDate?: string;
  readTime?: number; // 分钟
  views?: number;
  author?: {
    name: string;
    email?: string;
    avatar?: string;
  };
  tags?: string[];
  category?: string;
}

interface RelatedArticle {
  title: string;
  href: string;
  category?: string;
}

interface ArticleSidebarProps {
  metadata: ArticleMetadata;
  relatedArticles?: RelatedArticle[];
}

export function ArticleSidebar({ metadata, relatedArticles }: ArticleSidebarProps) {
  const { publishDate, updateDate, readTime, views, author, tags, category } = metadata;

  return (
    <div className="space-y-6">
      {/* 文章信息卡片 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">文章信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {publishDate && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>发布于 {publishDate}</span>
            </div>
          )}
          {updateDate && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>更新于 {updateDate}</span>
            </div>
          )}
          {readTime && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{readTime} 分钟阅读</span>
            </div>
          )}
          {views && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>{views.toLocaleString()} 次阅读</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 作者信息卡片 */}
      {author && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">作者</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              {author.avatar ? (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {author.name[0]}
                  </span>
                </div>
              )}
              <div>
                <p className="font-semibold text-sm">{author.name}</p>
                {author.email && (
                  <p className="text-xs text-muted-foreground">{author.email}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 分类和标签 */}
      {(category || (tags && tags.length > 0)) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Tag className="h-4 w-4" />
              分类和标签
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {category && (
              <div>
                <p className="text-xs text-muted-foreground mb-2">分类</p>
                <Badge variant="outline">{category}</Badge>
              </div>
            )}
            {tags && tags.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-2">标签</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* 相关文章 */}
      {relatedArticles && relatedArticles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">相关阅读</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {relatedArticles.map((article, index) => (
                <li key={index}>
                  <Link
                    href={article.href}
                    className="block text-sm hover:text-primary transition-colors group"
                  >
                    <span className="line-clamp-2 group-hover:underline">
                      {article.title}
                    </span>
                    {article.category && (
                      <span className="text-xs text-muted-foreground mt-1 block">
                        {article.category}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* 分享按钮 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">分享文章</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('链接已复制！');
              }}
              className="flex-1 px-3 py-2 text-xs border rounded-md hover:bg-accent transition-colors"
            >
              📋 复制链接
            </button>
            <button
              onClick={() => {
                window.open(
                  `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`,
                  '_blank'
                );
              }}
              className="flex-1 px-3 py-2 text-xs border rounded-md hover:bg-accent transition-colors"
            >
              🐦 Twitter
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 