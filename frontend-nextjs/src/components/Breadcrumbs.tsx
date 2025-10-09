'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from 'next/navigation';
import { Home } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbsProps {
  locale: string;
  customItems?: Array<{
    label: string;
    href?: string;
  }>;
}

export function Breadcrumbs({ locale, customItems }: BreadcrumbsProps) {
  const pathname = usePathname();

  // 如果提供了自定义项，使用它们
  if (customItems && customItems.length > 0) {
    return (
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${locale}`} aria-label="Home">
                <Home className="h-4 w-4" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {customItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {item.href && index < customItems.length - 1 ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  // 自动生成面包屑
  const pathSegments = pathname.split('/').filter(Boolean);
  
  // 移除语言代码
  const segments = pathSegments.filter(seg => seg !== locale);

  // 如果只在首页，不显示面包屑
  if (segments.length === 0) {
    return null;
  }

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/${locale}`} aria-label="Home">
              <Home className="h-4 w-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, index) => {
          const href = `/${locale}/${segments.slice(0, index + 1).join('/')}`;
          const isLast = index === segments.length - 1;
          
          // 将 URL 段转换为可读标签（首字母大写）
          const label = segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

          return (
            <div key={segment} className="flex items-center">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

