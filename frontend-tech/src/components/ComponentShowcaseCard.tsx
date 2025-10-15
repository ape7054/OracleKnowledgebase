'use client'

import React, { useState, useMemo, useCallback, memo, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Check, Copy, Code2, Eye, ChevronDown, ChevronUp } from 'lucide-react'
import { type ComponentItem } from '@/config/showcase-components'
import { useTheme } from 'next-themes'

interface ComponentShowcaseCardProps {
  component: ComponentItem
}

const ComponentShowcaseCardInner = ({ component }: ComponentShowcaseCardProps) => {
  const { theme } = useTheme()
  const [copied, setCopied] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [codeExpanded, setCodeExpanded] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Intersection Observer - 按需渲染组件预览
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 延迟渲染，避免同时渲染过多组件
            setTimeout(() => setShouldRender(true), 100)
          }
        })
      },
      {
        root: null,
        rootMargin: '50px', // 提前50px开始加载
        threshold: 0.1,
      }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  // 使用 useCallback 缓存函数
  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(component.codeExample)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }, [component.codeExample])

  // 使用 useMemo 缓存当前变体的 props
  const currentProps = useMemo(() => {
    if (component.variants && component.variants[selectedVariant]) {
      return component.variants[selectedVariant].props
    }
    return component.props || {}
  }, [component.variants, component.props, selectedVariant])

  // 使用 useMemo 缓存渲染的组件预览 - 按需渲染优化
  const componentPreview = useMemo(() => {
    // 如果还未进入视口，显示骨架屏
    if (!shouldRender) {
      return (
        <div className={`flex items-center justify-center min-h-[120px] p-6 rounded-lg border ${
          theme === "dark"
            ? "bg-slate-800/50 border-slate-700/50"
            : "bg-slate-100/50 border-slate-300/50"
        }`}>
          <div className="animate-pulse space-y-3 w-full">
            <div className={`h-4 rounded ${theme === "dark" ? "bg-slate-700" : "bg-slate-300"} w-3/4 mx-auto`}></div>
            <div className={`h-4 rounded ${theme === "dark" ? "bg-slate-700" : "bg-slate-300"} w-1/2 mx-auto`}></div>
          </div>
        </div>
      )
    }

    try {
      const ComponentToRender = component.component
      
      return (
        <div className={`flex items-center justify-center min-h-[120px] p-6 rounded-lg border ${
          theme === "dark"
            ? "bg-slate-800/50 border-slate-700/50"
            : "bg-slate-100/50 border-slate-300/50"
        }`}>
          <ComponentToRender {...currentProps} />
        </div>
      )
    } catch (error) {
      console.error('Error rendering component:', error)
      return (
        <div className={`flex items-center justify-center min-h-[120px] p-6 rounded-lg border ${
          theme === "dark"
            ? "bg-slate-800/50 border-slate-700/50"
            : "bg-slate-100/50 border-slate-300/50"
        }`}>
          <div className={`text-center ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
            <Code2 className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">预览错误</p>
          </div>
        </div>
      )
    }
  }, [component.component, currentProps, theme, shouldRender])

  return (
    <Card 
      ref={cardRef}
      className={`hover:shadow-xl transition-[transform,box-shadow] duration-300 hover:-translate-y-1 group h-full will-change-transform ${
        theme === "dark"
          ? "bg-slate-900/90 border-slate-700/50"
          : "bg-white/90 border-slate-300/50"
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className={`text-xl transition-colors ${
              theme === "dark"
                ? "text-slate-100 group-hover:text-cyan-400"
                : "text-slate-900 group-hover:text-cyan-600"
            }`}>
              {component.name}
            </CardTitle>
            <CardDescription className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
              {component.description}
            </CardDescription>
          </div>
          <Badge variant="outline" className={`text-xs ${
            theme === "dark"
              ? "bg-slate-800/50 text-cyan-400 border-cyan-500/50"
              : "bg-cyan-50 text-cyan-600 border-cyan-300"
          }`}>
            {component.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className={`p-1 w-full ${theme === "dark" ? "bg-slate-800/50" : "bg-slate-200/50"}`}>
            <TabsTrigger
              value="preview"
              className={`flex-1 gap-2 ${
                theme === "dark"
                  ? "data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  : "data-[state=active]:bg-white data-[state=active]:text-cyan-600"
              }`}
            >
              <Eye className="h-4 w-4" />
              预览
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className={`flex-1 gap-2 ${
                theme === "dark"
                  ? "data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  : "data-[state=active]:bg-white data-[state=active]:text-cyan-600"
              }`}
            >
              <Code2 className="h-4 w-4" />
              代码
            </TabsTrigger>
          </TabsList>

          {/* 预览标签页 */}
          <TabsContent value="preview" className="space-y-4 mt-4">
            {/* 变体选择 */}
            {component.variants && component.variants.length > 0 && (
              <div className="space-y-2">
                <h4 className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-800"}`}>变体选择</h4>
                <div className="flex flex-wrap gap-2">
                  {component.variants.map((variant, index) => (
                    <Button
                      key={index}
                      variant={selectedVariant === index ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedVariant(index)}
                      className={`text-xs ${
                        selectedVariant === index
                          ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                          : theme === "dark"
                            ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-cyan-400'
                            : 'border-slate-300 text-slate-700 hover:bg-slate-200 hover:text-cyan-600'
                      }`}
                    >
                      {variant.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* 预览区域 */}
            {componentPreview}

            {/* 当前变体描述 */}
            {component.variants && component.variants[selectedVariant]?.description && (
              <div className={`text-xs rounded-md p-2 border ${
                theme === "dark"
                  ? "text-slate-400 bg-slate-800/30 border-slate-700/30"
                  : "text-slate-600 bg-slate-100/30 border-slate-300/30"
              }`}>
                {component.variants[selectedVariant].description}
              </div>
            )}
          </TabsContent>

          {/* 代码标签页 */}
          <TabsContent value="code" className="space-y-4 mt-4">
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <h4 className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-800"}`}>使用示例</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copyCode}
                  className={`text-xs ${
                    theme === "dark"
                      ? "text-slate-400 hover:text-cyan-400 hover:bg-slate-700"
                      : "text-slate-600 hover:text-cyan-600 hover:bg-slate-200"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 mr-1" />
                      已复制
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 mr-1" />
                      复制
                    </>
                  )}
                </Button>
              </div>
              
              <div className={`rounded-lg border overflow-hidden ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-700/50"
                  : "bg-slate-100 border-slate-300/50"
              }`}>
                <div 
                  className={`transition-all duration-300 ${
                    codeExpanded ? 'max-h-none' : 'max-h-32'
                  } overflow-hidden`}
                >
                  <pre className={`p-4 text-xs overflow-x-auto ${theme === "dark" ? "text-slate-300" : "text-slate-800"}`}>
                    <code>{component.codeExample}</code>
                  </pre>
                </div>
                
                {/* 展开/折叠按钮 */}
                <div className={`border-t ${
                  theme === "dark"
                    ? "border-slate-700/50 bg-slate-800/50"
                    : "border-slate-300/50 bg-slate-200/50"
                }`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCodeExpanded(!codeExpanded)}
                    className={`w-full text-xs rounded-none ${
                      theme === "dark"
                        ? "text-slate-400 hover:text-cyan-400 hover:bg-slate-700/50"
                        : "text-slate-600 hover:text-cyan-600 hover:bg-slate-200/50"
                    }`}
                  >
                    {codeExpanded ? (
                      <>
                        <ChevronUp className="h-3 w-3 mr-1" />
                        收起代码
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-3 w-3 mr-1" />
                        展开代码
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

ComponentShowcaseCardInner.displayName = 'ComponentShowcaseCard'

export const ComponentShowcaseCard = memo(ComponentShowcaseCardInner, (prevProps, nextProps) => {
  // 自定义比较函数：只有当 component id 改变时才重新渲染
  return prevProps.component.id === nextProps.component.id
})