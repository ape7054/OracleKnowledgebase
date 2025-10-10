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
      <Breadcrumb className="mb-4 md:mb-6">
        <BreadcrumbList className="text-xs md:text-sm">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${locale}`} aria-label="Home" className="min-h-[44px] flex items-center">
                <Home className="h-3 w-3 md:h-4 md:w-4" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {customItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <BreadcrumbSeparator className="text-xs md:text-sm" />
              <BreadcrumbItem>
                {item.href && index < customItems.length - 1 ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.href} className="min-h-[44px] flex items-center truncate max-w-[120px] md:max-w-none">{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="truncate max-w-[150px] md:max-w-none">{item.label}</BreadcrumbPage>
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
    <Breadcrumb className="mb-4 md:mb-6">
      <BreadcrumbList className="text-xs md:text-sm">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/${locale}`} aria-label="Home" className="min-h-[44px] flex items-center">
              <Home className="h-3 w-3 md:h-4 md:w-4" />
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
              <BreadcrumbSeparator className="text-xs md:text-sm" />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="truncate max-w-[150px] md:max-w-none">{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href} className="min-h-[44px] flex items-center truncate max-w-[120px] md:max-w-none">{label}</Link>
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

