'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Check, Copy, Code2, Eye, ChevronDown, ChevronUp } from 'lucide-react'
import { type ComponentItem } from '@/config/showcase-components'

interface ComponentShowcaseCardProps {
  component: ComponentItem
}

export function ComponentShowcaseCard({ component }: ComponentShowcaseCardProps) {
  const [copied, setCopied] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [codeExpanded, setCodeExpanded] = useState(false)

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(component.codeExample)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

  // 获取当前变体的props
  const getCurrentProps = () => {
    if (component.variants && component.variants[selectedVariant]) {
      return component.variants[selectedVariant].props
    }
    return component.props || {}
  }

  // 渲染组件预览
  const renderComponentPreview = () => {
    try {
      const ComponentToRender = component.component
      const props = getCurrentProps()
      
      return (
        <div className="flex items-center justify-center min-h-[120px] p-6 bg-slate-800/30 rounded-lg border border-slate-700/50 backdrop-blur-sm">
          <ComponentToRender {...props} />
        </div>
      )
    } catch (error) {
      console.error('Error rendering component:', error)
      return (
        <div className="flex items-center justify-center min-h-[120px] p-6 bg-slate-800/30 rounded-lg border border-slate-700/50 backdrop-blur-sm">
          <div className="text-center text-slate-400">
            <Code2 className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">预览错误</p>
          </div>
        </div>
      )
    }
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl text-slate-100 group-hover:text-cyan-400 transition-colors">
              {component.name}
            </CardTitle>
            <CardDescription className="text-slate-400 text-sm">
              {component.description}
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50 text-xs">
            {component.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="bg-slate-800/50 p-1 w-full">
            <TabsTrigger
              value="preview"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400 flex-1 gap-2"
            >
              <Eye className="h-4 w-4" />
              预览
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400 flex-1 gap-2"
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
                <h4 className="text-sm font-medium text-slate-300">变体选择</h4>
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
                          : 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-cyan-400'
                      }`}
                    >
                      {variant.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* 预览区域 */}
            {renderComponentPreview()}

            {/* 当前变体描述 */}
            {component.variants && component.variants[selectedVariant]?.description && (
              <div className="text-xs text-slate-400 bg-slate-800/30 rounded-md p-2 border border-slate-700/30">
                {component.variants[selectedVariant].description}
              </div>
            )}
          </TabsContent>

          {/* 代码标签页 */}
          <TabsContent value="code" className="space-y-4 mt-4">
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-slate-300">使用示例</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copyCode}
                  className="text-xs text-slate-400 hover:text-cyan-400 hover:bg-slate-700"
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
              
              <div className="bg-slate-900/80 rounded-lg border border-slate-700/50 overflow-hidden">
                <div 
                  className={`transition-all duration-300 ${
                    codeExpanded ? 'max-h-none' : 'max-h-32'
                  } overflow-hidden`}
                >
                  <pre className="p-4 text-xs text-slate-300 overflow-x-auto">
                    <code>{component.codeExample}</code>
                  </pre>
                </div>
                
                {/* 展开/折叠按钮 */}
                <div className="border-t border-slate-700/50 bg-slate-800/50">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCodeExpanded(!codeExpanded)}
                    className="w-full text-xs text-slate-400 hover:text-cyan-400 hover:bg-slate-700/50 rounded-none"
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