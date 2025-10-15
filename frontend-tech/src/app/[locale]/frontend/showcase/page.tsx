"use client"

import { useEffect, useState, useMemo, useCallback, memo, useRef } from "react"
import { useTheme } from "next-themes"
import { useTranslations } from "next-intl"
import { useParams, useRouter } from "next/navigation"
import { 
  Activity,
  AlertCircle,
  ArrowLeft,
  BarChart3,
  Bell,
  Command,
  Database,
  Download,
  Globe,
  Hexagon,
  Layers,
  LineChart,
  type LucideIcon,
  Moon,
  RefreshCw,
  Search,
  Settings,
  Shield,
  Sparkles,
  Sun,
  Zap,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { ComponentShowcaseCard } from "@/components/ComponentShowcaseCard"
import { getComponentsByCategory, componentCategories } from "@/config/showcase-components"

export default function Dashboard() {
  const t = useTranslations("frontend.showcase")
  const params = useParams()
  const router = useRouter()
  const locale = params.locale as string
  const { theme, setTheme } = useTheme()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [systemStatus, setSystemStatus] = useState(85)
  const [networkStatus, setNetworkStatus] = useState(92)
  const [securityLevel] = useState(75)
  const [isLoading, setIsLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(6) // Lazy loading: initially show 6 components
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)
  const loadMoreRef = useRef<HTMLDivElement>(null) // Intersection Observer ref

  // Handle mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // Get current category components and filter by search - 使用 useMemo 缓存
  const currentComponents = useMemo(() => {
    const allComponents = getComponentsByCategory(selectedCategory)
    if (!searchQuery) return allComponents
    
    const query = searchQuery.toLowerCase()
    return allComponents.filter(component => 
      component.name.toLowerCase().includes(query) ||
      component.description.toLowerCase().includes(query) ||
      component.category.toLowerCase().includes(query)
    )
  }, [selectedCategory, searchQuery])

  // Simulate data loading - optimized loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500) // Reduced from 2s to 0.5s

    return () => clearTimeout(timer)
  }, [])


  // Reset visible count when category or search changes
  useEffect(() => {
    setVisibleCount(6)
  }, [selectedCategory, searchQuery])

  // Simulate changing data - 进一步优化为30秒更新一次
  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkStatus(Math.floor(Math.random() * 15) + 80)
      setSystemStatus(Math.floor(Math.random() * 10) + 80)
    }, 30000) // 优化为30秒更新一次，减少不必要的重渲染

    return () => clearInterval(interval)
  }, [])

  // Toggle theme - 简化为使用 next-themes 内置机制，使用 useCallback 缓存
  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark")
  }, [theme, setTheme])

  // Clear search - 使用 useCallback 缓存
  const clearSearch = useCallback(() => {
    setSearchQuery("")
  }, [])

  // Load more - 使用 useCallback 缓存
  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + 6, currentComponents.length))
  }, [currentComponents.length])

  // Intersection Observer 自动加载更多
  useEffect(() => {
    if (!loadMoreRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && visibleCount < currentComponents.length) {
          loadMore()
        }
      },
      {
        root: null,
        rootMargin: '100px', // 提前100px触发加载
        threshold: 0.1,
      }
    )

    observer.observe(loadMoreRef.current)

    return () => {
      observer.disconnect()
    }
  }, [loadMore, visibleCount, currentComponents.length])

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <div
      className={`min-h-screen relative transition-colors duration-300
        ${theme === "dark" 
          ? "bg-gradient-to-br from-black to-slate-900 text-slate-100" 
          : "bg-gradient-to-br from-slate-50 to-slate-200 text-slate-900"
        }`}
    >
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-r-purple-500 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
              <div className="absolute inset-6 border-4 border-b-blue-500 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
              <div className="absolute inset-8 border-4 border-l-green-500 border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
            <div className="mt-4 text-cyan-500 font-mono text-sm tracking-wider">SYSTEM INITIALIZING</div>
                </div>
              </div>
      )}

      <div className="container mx-auto p-4 relative z-10">
        {/* Header */}
        <header className="flex flex-col space-y-4 py-4 border-b border-slate-700/50 mb-6">
          {/* Return Button and Title */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/${locale}/frontend`)}
              className={`flex items-center gap-2 ${
                theme === "dark"
                  ? "text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50"
                  : "text-slate-600 hover:text-cyan-600 hover:bg-slate-200/50"
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              {t("backToFrontend")}
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Hexagon className="h-8 w-8 text-cyan-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {t("title").toUpperCase()}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleTheme}
                      className={theme === "dark"
                        ? "text-slate-400 hover:text-slate-100"
                        : "text-slate-600 hover:text-slate-900"
                      }
                    >
                      {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>切换主题</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Search bar - full width on all screens */}
          <div className={`flex items-center space-x-1 rounded-full px-3 py-1.5 border backdrop-blur-sm w-full transition-colors ${
            theme === "dark"
              ? "bg-slate-800/50 border-slate-700/50"
              : "bg-white/50 border-slate-300/50"
          }`}>
            <Search className={`h-4 w-4 flex-shrink-0 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`} />
            <input
              type="text"
              placeholder={t("search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`bg-transparent border-none focus:outline-none text-sm flex-1 ${
                theme === "dark" 
                  ? "text-slate-100 placeholder:text-slate-500" 
                  : "text-slate-900 placeholder:text-slate-400"
              }`}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className={`transition-colors flex-shrink-0 ${
                  theme === "dark"
                    ? "text-slate-400 hover:text-slate-100"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                aria-label={t("search")}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          </header>

        {/* Main content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <div className="md:sticky md:top-6 md:max-h-[calc(100vh-4rem)] md:overflow-y-auto">
              <Card className={`backdrop-blur-sm transition-colors ${
                theme === "dark" 
                  ? "bg-slate-900/50 border-slate-700/50" 
                  : "bg-white/70 border-slate-300/50"
              }`}>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <NavItem 
                    icon={Command} 
                    label="全部组件" 
                    active={selectedCategory === "all"}
                    onClick={() => setSelectedCategory("all")}
                    theme={theme}
                  />
                  <NavItem 
                    icon={Zap} 
                    label="基础组件"
                    active={selectedCategory === "basic"}
                    onClick={() => setSelectedCategory("basic")}
                    theme={theme}
                  />
                  <NavItem 
                    icon={Settings} 
                    label="表单组件"
                    active={selectedCategory === "forms"}
                    onClick={() => setSelectedCategory("forms")}
                    theme={theme}
                  />
                  <NavItem 
                    icon={Activity} 
                    label="布局组件"
                    active={selectedCategory === "layout"}
                    onClick={() => setSelectedCategory("layout")}
                    theme={theme}
                  />
                  <NavItem 
                    icon={Globe} 
                    label="导航组件"
                    active={selectedCategory === "navigation"}
                    onClick={() => setSelectedCategory("navigation")}
                    theme={theme}
                  />
                  <NavItem 
                    icon={AlertCircle} 
                    label="反馈组件"
                    active={selectedCategory === "feedback"}
                    onClick={() => setSelectedCategory("feedback")}
                    theme={theme}
                  />
                  <NavItem 
                    icon={Database} 
                    label="数据展示"
                    active={selectedCategory === "data"}
                    onClick={() => setSelectedCategory("data")}
                    theme={theme}
                  />
                  <NavItem 
                    icon={Sparkles} 
                    label="动效组件"
                    active={selectedCategory === "animations"}
                    onClick={() => setSelectedCategory("animations")}
                    theme={theme}
                  />
                  <NavItem 
                    icon={Layers} 
                    label="复合组件"
                    active={selectedCategory === "composite"}
                    onClick={() => setSelectedCategory("composite")}
                    theme={theme}
                  />
                  <NavItem 
                    icon={Download} 
                    label="业务组件"
                    active={selectedCategory === "business"}
                    onClick={() => setSelectedCategory("business")}
                    theme={theme}
                  />
                </nav>

                <div className={`mt-8 pt-6 border-t ${theme === "dark" ? "border-slate-700/50" : "border-slate-300/50"}`}>
                  <div className={`text-xs mb-2 font-mono ${theme === "dark" ? "text-slate-500" : "text-slate-600"}`}>LIBRARY STATUS</div>
                        <div className="space-y-3">
                    <StatusItem label="Components" value={systemStatus} color="cyan" theme={theme} />
                    <StatusItem label="Ready to Use" value={securityLevel} color="green" theme={theme} />
                    <StatusItem label="Documentation" value={networkStatus} color="blue" theme={theme} />
                  </div>
                </div>
              </CardContent>
            </Card>
            </div>
          </div>

          {/* Main dashboard */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10">
            <div className="grid gap-6">
              {/* System overview */}
              <Card className={`backdrop-blur-sm overflow-hidden transition-colors ${
                theme === "dark"
                  ? "bg-slate-900/50 border-slate-700/50"
                  : "bg-white/70 border-slate-300/50"
              }`}>
                <CardHeader className={`border-b pb-3 ${theme === "dark" ? "border-slate-700/50" : "border-slate-300/50"}`}>
                  <div className="flex items-center justify-between">
                    <CardTitle className={`flex items-center ${theme === "dark" ? "text-slate-100" : "text-slate-900"}`}>
                      <Activity className="mr-2 h-5 w-5 text-cyan-500" />
                      Component Library Overview
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={`text-xs ${
                        theme === "dark"
                          ? "bg-slate-800/50 text-cyan-400 border-cyan-500/50"
                          : "bg-cyan-50 text-cyan-600 border-cyan-300"
                      }`}>
                        <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-1 animate-pulse"></div>
                        LIVE
                            </Badge>
                      <Button variant="ghost" size="icon" className={`h-8 w-8 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard
                      title={selectedCategory === "all" ? "Total Components" : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Components`}
                      value={Math.min(100, currentComponents.length * 10)}
                      icon={Database}
                      trend="up"
                      color="cyan"
                      detail={`${currentComponents.length} Components`}
                      theme={theme}
                    />
                    <MetricCard
                      title="Categories"
                      value={selectedCategory === "all" ? 100 : 75}
                      icon={Activity}
                      trend="stable"
                      color="purple"
                      detail={selectedCategory === "all" ? "8 Main Categories" : "Filtered View"}
                      theme={theme}
                    />
                    <MetricCard
                      title="Code Quality"
                      value={networkStatus}
                      icon={Shield}
                      trend="up"
                      color="blue"
                      detail="TypeScript + Tests"
                      theme={theme}
                    />
                  </div>

                  <div className="mt-8">
                    <Tabs defaultValue="performance" className="w-full">
                      <div className="flex items-center justify-between mb-4">
                        <TabsList className={`p-1 ${theme === "dark" ? "bg-slate-800/50" : "bg-slate-200/50"}`}>
                          <TabsTrigger
                            value="performance"
                            className={theme === "dark" 
                              ? "data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                              : "data-[state=active]:bg-white data-[state=active]:text-cyan-600"
                            }
                          >
                            Preview
                          </TabsTrigger>
                          <TabsTrigger
                            value="processes"
                            className={theme === "dark"
                              ? "data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                              : "data-[state=active]:bg-white data-[state=active]:text-cyan-600"
                            }
                          >
                            Components
                          </TabsTrigger>
                          <TabsTrigger
                            value="storage"
                            className={theme === "dark"
                              ? "data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                              : "data-[state=active]:bg-white data-[state=active]:text-cyan-600"
                            }
                          >
                            Stats
                          </TabsTrigger>
                        </TabsList>

                        <div className={`flex items-center space-x-2 text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-cyan-500 mr-1"></div>
                            UI
                          </div>
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-purple-500 mr-1"></div>
                            Form
                          </div>
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-blue-500 mr-1"></div>
                            Data
                          </div>
                        </div>
                      </div>

                      <TabsContent value="performance" className="mt-0">
                        <div className="space-y-6">
                          {/* 分类标题 */}
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-slate-100" : "text-slate-900"}`}>
                                {selectedCategory === "all" 
                                  ? "全部组件" 
                                  : componentCategories[selectedCategory as keyof typeof componentCategories]?.name || "组件预览"
                                }
                              </h3>
                              <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                                {searchQuery ? (
                                  <>找到 {currentComponents.length} 个匹配的组件</>
                                ) : (
                                  <>共 {currentComponents.length} 个组件</>
                                )}
                              </p>
                            </div>
                            {searchQuery && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={clearSearch}
                                className="text-xs border-slate-600 text-slate-300 hover:bg-slate-700"
                              >
                                <X className="h-3 w-3 mr-1" />
                                清除搜索
                              </Button>
                            )}
                          </div>

                          {/* 组件网格 */}
                          {currentComponents.length > 0 ? (
                            <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {currentComponents.slice(0, visibleCount).map((component) => (
                                <ComponentShowcaseCard 
                                  key={component.id} 
                                  component={component} 
                                />
                              ))}
                            </div>
                              
                              {/* Intersection Observer trigger for auto loading */}
                              {visibleCount < currentComponents.length && (
                                <div ref={loadMoreRef} className="flex items-center justify-center mt-8">
                                  <Button
                                    onClick={loadMore}
                                    variant="outline"
                                    className={`flex items-center gap-2 ${
                                      theme === "dark"
                                        ? "border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
                                        : "border-cyan-600/50 text-cyan-600 hover:bg-cyan-600/10 hover:text-cyan-700"
                                    }`}
                                  >
                                    <Download className="h-4 w-4" />
                                    {t("loadMore")} ({currentComponents.length - visibleCount})
                                  </Button>
                                </div>
                              )}
                              
                              {visibleCount >= currentComponents.length && currentComponents.length > 6 && (
                                <div className="flex items-center justify-center h-16 mt-6">
                                  <div className={`text-sm ${theme === "dark" ? "text-slate-500" : "text-slate-600"}`}>
                                    {t("allLoaded")} {currentComponents.length} {t("components")}
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className={`flex items-center justify-center h-64 rounded-lg border ${
                              theme === "dark" 
                                ? "bg-slate-800/30 border-slate-700/50" 
                                : "bg-slate-100/50 border-slate-300/50"
                            }`}>
                              <div className="text-center text-slate-400">
                                {searchQuery ? (
                                  <>
                                    <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p className="text-lg font-medium mb-2">未找到匹配的组件</p>
                                    <p className="text-sm mb-4">试试搜索其他关键词，或清除搜索查看全部组件</p>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={clearSearch}
                                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                                    >
                                      <X className="h-3 w-3 mr-1" />
                                      清除搜索
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p className="text-lg font-medium mb-2">暂无组件</p>
                                    <p className="text-sm">该分类下还没有组件</p>
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="processes" className="mt-0">
                        <div className={`rounded-lg border overflow-hidden ${
                          theme === "dark"
                            ? "bg-slate-800/30 border-slate-700/50"
                            : "bg-slate-100/30 border-slate-300/50"
                        }`}>
                          <div className={`grid grid-cols-12 text-xs p-3 border-b ${
                            theme === "dark"
                              ? "text-slate-400 border-slate-700/50 bg-slate-800/50"
                              : "text-slate-600 border-slate-300/50 bg-slate-200/50"
                          }`}>
                            <div className="col-span-1">ID</div>
                            <div className="col-span-4">Component</div>
                            <div className="col-span-2">Category</div>
                            <div className="col-span-2">Usage</div>
                            <div className="col-span-2">Size</div>
                            <div className="col-span-1">Status</div>
                          </div>

                          <div className="divide-y divide-slate-700/30">
                            {currentComponents.map((component) => (
                              <ProcessRow
                                key={component.id}
                                pid={component.id}
                                name={component.name}
                                user={component.category}
                                cpu={Math.floor(Math.random() * 20) + 5} // 随机生成使用率
                                memory={Math.floor(Math.random() * 10) + 2} // 随机生成大小
                                status="active"
                                theme={theme}
                              />
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="storage" className="mt-0">
                        <div className={`rounded-lg border p-4 ${
                          theme === "dark"
                            ? "bg-slate-800/30 border-slate-700/50"
                            : "bg-slate-100/30 border-slate-300/50"
                        }`}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <StorageItem name="UI Components" total={100} used={70} type="shadcn" theme={theme} />
                            <StorageItem name="Form Controls" total={50} used={42} type="Radix" theme={theme} />
                            <StorageItem name="Data Display" total={40} used={28} type="Custom" theme={theme} />
                            <StorageItem name="Utilities" total={30} used={22} type="Hooks" theme={theme} />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>

              {/* Security & Alerts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className={`backdrop-blur-sm transition-colors ${
                  theme === "dark"
                    ? "bg-slate-900/50 border-slate-700/50"
                    : "bg-white/70 border-slate-300/50"
                }`}>
                  <CardHeader className="pb-2">
                    <CardTitle className={`flex items-center text-base ${theme === "dark" ? "text-slate-100" : "text-slate-900"}`}>
                      <Activity className="mr-2 h-5 w-5 text-green-500" />
                      Component Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">UI Components</div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">70+ Ready</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">TypeScript Support</div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">100%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">Accessibility</div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">WCAG 2.1</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">Documentation</div>
                        <div className="text-sm text-cyan-400">
                          Updated <span className="text-slate-500">12 min ago</span>
                        </div>
                      </div>

                      <div className="pt-2 mt-2 border-t border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium">Completion Rate</div>
                          <div className="text-sm text-cyan-400">{securityLevel}%</div>
                        </div>
                        <Progress value={securityLevel} className="h-2 bg-slate-700">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
                            style={{ width: `${securityLevel}%` }}
                          />
                        </Progress>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`backdrop-blur-sm transition-colors ${
                  theme === "dark"
                    ? "bg-slate-900/50 border-slate-700/50"
                    : "bg-white/70 border-slate-300/50"
                }`}>
                  <CardHeader className="pb-2">
                    <CardTitle className={`flex items-center text-base ${theme === "dark" ? "text-slate-100" : "text-slate-900"}`}>
                      <Bell className="mr-2 h-5 w-5 text-amber-500" />
                      Recent Updates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <AlertItem
                        title="Tooltip Component Updated"
                        time="14:32:12"
                        description="Added new positioning options and animations"
                        type="info"
                        theme={theme}
                      />
                      <AlertItem
                        title="Dialog Performance Improved"
                        time="13:45:06"
                        description="Reduced initial render time by 40%"
                        type="success"
                        theme={theme}
                      />
                      <AlertItem
                        title="New Component: DatePicker"
                        time="09:12:45"
                        description="Full-featured date picker with range selection"
                        type="update"
                        theme={theme}
                      />
                      <AlertItem
                        title="Accessibility Enhanced"
                        time="04:30:00"
                        description="All components now WCAG 2.1 compliant"
                        type="success"
                        theme={theme}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Communications */}
              <Card className={`backdrop-blur-sm transition-colors ${
                theme === "dark"
                  ? "bg-slate-900/50 border-slate-700/50"
                  : "bg-white/70 border-slate-300/50"
              }`}>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className={`flex items-center text-base ${theme === "dark" ? "text-slate-100" : "text-slate-900"}`}>
                    <Database className="mr-2 h-5 w-5 text-blue-500" />
                    Recently Added Components
                  </CardTitle>
                  <Badge variant="outline" className={theme === "dark"
                    ? "bg-slate-800/50 text-blue-400 border-blue-500/50"
                    : "bg-blue-50 text-blue-600 border-blue-300"
                  }>
                    4 New This Week
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <CommunicationItem
                      sender="DatePicker"
                      time="Today"
                      message="Full-featured date picker with range selection, time zones, and custom formatting options."
                      unread
                      theme={theme}
                    />
                    <CommunicationItem
                      sender="DataTable"
                      time="Yesterday"
                      message="Advanced data table with sorting, filtering, pagination, and virtualization for large datasets."
                      unread
                      theme={theme}
                    />
                    <CommunicationItem
                      sender="CommandPalette"
                      time="2 days ago"
                      message="Fast command palette with fuzzy search, keyboard shortcuts, and custom actions."
                      unread
                      theme={theme}
                    />
                    <CommunicationItem
                      sender="ColorPicker"
                      time="3 days ago"
                      message="Beautiful color picker with multiple formats, eyedropper, and saved palettes."
                      unread
                      theme={theme}
                    />
                  </div>
                </CardContent>
                <CardFooter className={`border-t pt-4 ${theme === "dark" ? "border-slate-700/50" : "border-slate-300/50"}`}>
                  <div className="flex items-center w-full space-x-2">
                    <input
                      type="text"
                      placeholder="Search components..."
                      className={`flex-1 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 border ${
                        theme === "dark"
                          ? "bg-slate-800/50 border-slate-700/50 text-slate-100"
                          : "bg-slate-100/50 border-slate-300/50 text-slate-900"
                      }`}
                    />
                    <Button size="icon" className="bg-blue-600 hover:bg-blue-700">
                      <Search className="h-4 w-4" />
                    </Button>
                    <Button size="icon" className="bg-cyan-600 hover:bg-cyan-700">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
                  </div>
                </div>
  )
}

// Component for nav items - 使用 memo 优化
const NavItem = memo(({ 
  icon: Icon, 
  label, 
  active,
  onClick,
  theme 
}: { 
  icon: LucideIcon; 
  label: string; 
  active?: boolean;
  onClick?: () => void;
  theme?: string;
}) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={`w-full justify-start ${
        active 
          ? theme === "dark" 
            ? "bg-slate-800/70 text-cyan-400" 
            : "bg-slate-200/70 text-cyan-600"
          : theme === "dark"
            ? "text-slate-400 hover:text-slate-100"
            : "text-slate-600 hover:text-slate-900"
      }`}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
})
NavItem.displayName = "NavItem"

// Component for status items - 使用 memo 优化
const StatusItem = memo(({ label, value, color, theme }: { label: string; value: number; color: string; theme?: string }) => {
  const getColor = () => {
    switch (color) {
      case "cyan":
        return "from-cyan-500 to-blue-500"
      case "green":
        return "from-green-500 to-emerald-500"
      case "blue":
        return "from-blue-500 to-indigo-500"
      case "purple":
        return "from-purple-500 to-pink-500"
      default:
        return "from-cyan-500 to-blue-500"
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{label}</div>
        <div className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{value}%</div>
      </div>
      <div className={`h-1.5 rounded-full overflow-hidden ${theme === "dark" ? "bg-slate-800" : "bg-slate-300"}`}>
        <div className={`h-full bg-gradient-to-r ${getColor()} rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  )
})
StatusItem.displayName = "StatusItem"

// Component for metric cards - 使用 memo 优化
const MetricCard = memo(({
  title,
  value,
  icon: Icon,
  trend,
  color,
  detail,
  theme,
}: {
  title: string
  value: number
  icon: LucideIcon
  trend: "up" | "down" | "stable"
  color: string
  detail: string
  theme?: string
}) => {
  const getColor = () => {
    switch (color) {
      case "cyan":
        return "from-cyan-500 to-blue-500 border-cyan-500/30"
      case "green":
        return "from-green-500 to-emerald-500 border-green-500/30"
      case "blue":
        return "from-blue-500 to-indigo-500 border-blue-500/30"
      case "purple":
        return "from-purple-500 to-pink-500 border-purple-500/30"
      default:
        return "from-cyan-500 to-blue-500 border-cyan-500/30"
    }
  }

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <BarChart3 className="h-4 w-4 text-amber-500" />
      case "down":
        return <BarChart3 className="h-4 w-4 rotate-180 text-green-500" />
      case "stable":
        return <LineChart className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className={`rounded-lg border ${getColor()} p-4 relative overflow-hidden ${
      theme === "dark" ? "bg-slate-800/50" : "bg-white/80"
    }`}>
      <div className="flex items-center justify-between mb-2">
        <div className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{title}</div>
        <Icon className={`h-5 w-5 text-${color}-500`} />
      </div>
      <div className={`text-2xl font-bold mb-1 ${
        theme === "dark" 
          ? "bg-gradient-to-r bg-clip-text text-transparent from-slate-100 to-slate-300"
          : "text-slate-900"
      }`}>
        {value}%
      </div>
      <div className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-600"}`}>{detail}</div>
      <div className="absolute bottom-2 right-2 flex items-center">{getTrendIcon()}</div>
      <div className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl from-cyan-500 to-blue-500"></div>
    </div>
  )
})
MetricCard.displayName = "MetricCard"


// Process row component - 使用 memo 优化
const ProcessRow = memo(({
  pid,
  name,
  user,
  cpu,
  memory,
  status,
  theme,
}: {
  pid: string
  name: string
  user: string
  cpu: number
  memory: number
  status: string
  theme?: string
}) => {
  return (
    <div className={`grid grid-cols-12 py-2 px-3 text-sm ${
      theme === "dark" ? "hover:bg-slate-800/50" : "hover:bg-slate-100/50"
    }`}>
      <div className={theme === "dark" ? "col-span-1 text-slate-500" : "col-span-1 text-slate-600"}>{pid}</div>
      <div className={theme === "dark" ? "col-span-4 text-slate-300" : "col-span-4 text-slate-800"}>{name}</div>
      <div className={theme === "dark" ? "col-span-2 text-slate-400" : "col-span-2 text-slate-600"}>{user}</div>
      <div className={theme === "dark" ? "col-span-2 text-cyan-400" : "col-span-2 text-cyan-600"}>{cpu}%</div>
      <div className={theme === "dark" ? "col-span-2 text-purple-400" : "col-span-2 text-purple-600"}>{memory} MB</div>
      <div className="col-span-1">
        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">
          {status}
        </Badge>
      </div>
    </div>
  )
})
ProcessRow.displayName = "ProcessRow"

// Storage item component - 使用 memo 优化
const StorageItem = memo(({
  name,
  total,
  used,
  type,
  theme,
}: {
  name: string
  total: number
  used: number
  type: string
  theme?: string
}) => {
  const percentage = Math.round((used / total) * 100)

  return (
    <div className={`rounded-md p-3 border ${
      theme === "dark"
        ? "bg-slate-800/50 border-slate-700/50"
        : "bg-slate-100/50 border-slate-300/50"
    }`}>
      <div className="flex items-center justify-between mb-2">
        <div className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-800"}`}>{name}</div>
        <Badge variant="outline" className={`text-xs ${
          theme === "dark"
            ? "bg-slate-700/50 text-slate-300 border-slate-600/50"
            : "bg-slate-200/50 text-slate-700 border-slate-400/50"
        }`}>
          {type}
        </Badge>
      </div>
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1">
          <div className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-600"}`}>
            {used} GB / {total} GB
          </div>
          <div className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{percentage}%</div>
        </div>
        <Progress value={percentage} className={`h-1.5 ${theme === "dark" ? "bg-slate-700" : "bg-slate-300"}`}>
          <div
            className={`h-full rounded-full ${
              percentage > 90 ? "bg-red-500" : percentage > 70 ? "bg-amber-500" : "bg-cyan-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </Progress>
      </div>
      <div className="flex items-center justify-between text-xs">
        <div className={theme === "dark" ? "text-slate-500" : "text-slate-600"}>Free: {total - used} GB</div>
        <Button variant="ghost" size="sm" className={`h-6 text-xs px-2 ${
          theme === "dark" 
            ? "text-slate-400 hover:text-slate-100"
            : "text-slate-600 hover:text-slate-900"
        }`}>
          Details
        </Button>
      </div>
    </div>
  )
})
StorageItem.displayName = "StorageItem"

// Alert item component - 使用 memo 优化
const AlertItem = memo(({
  title,
  time,
  description,
  type,
  theme,
}: {
  title: string
  time: string
  description: string
  type: "info" | "warning" | "error" | "success" | "update"
  theme?: string
}) => {
  const getTypeStyles = () => {
    const darkColors = {
      info: { icon: Info, color: "text-blue-500 bg-blue-500/10 border-blue-500/30" },
      warning: { icon: AlertCircle, color: "text-amber-500 bg-amber-500/10 border-amber-500/30" },
      error: { icon: AlertCircle, color: "text-red-500 bg-red-500/10 border-red-500/30" },
      success: { icon: Check, color: "text-green-500 bg-green-500/10 border-green-500/30" },
      update: { icon: Download, color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/30" }
    }
    const lightColors = {
      info: { icon: Info, color: "text-blue-600 bg-blue-50 border-blue-200" },
      warning: { icon: AlertCircle, color: "text-amber-600 bg-amber-50 border-amber-200" },
      error: { icon: AlertCircle, color: "text-red-600 bg-red-50 border-red-200" },
      success: { icon: Check, color: "text-green-600 bg-green-50 border-green-200" },
      update: { icon: Download, color: "text-cyan-600 bg-cyan-50 border-cyan-200" }
    }
    const colors = theme === "dark" ? darkColors : lightColors
    return colors[type] || colors.info
  }

  const { icon: Icon, color } = getTypeStyles()

  return (
    <div className="flex items-start space-x-3">
      <div className={`mt-0.5 p-1 rounded-full ${color.split(" ")[1]} ${color.split(" ")[2]}`}>
        <Icon className={`h-3 w-3 ${color.split(" ")[0]}`} />
      </div>
      <div>
        <div className="flex items-center">
          <div className={`text-sm font-medium ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>{title}</div>
          <div className={`ml-2 text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-600"}`}>{time}</div>
        </div>
        <div className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{description}</div>
      </div>
    </div>
  )
})
AlertItem.displayName = "AlertItem"

// Communication item component - 使用 memo 优化
const CommunicationItem = memo(({
  sender,
  time,
  message,
  unread,
  theme,
}: {
  sender: string
  time: string
  message: string
  unread?: boolean
  theme?: string
}) => {
  return (
    <div className={`flex space-x-3 p-2 rounded-md ${
      unread 
        ? theme === "dark" 
          ? "bg-slate-800/50 border border-slate-700/50" 
          : "bg-slate-100/50 border border-slate-300/50"
        : ""
    }`}>
      <div className={`h-8 w-8 rounded-full flex items-center justify-center text-cyan-500 font-semibold text-sm flex-shrink-0 ${
        theme === "dark" ? "bg-slate-700" : "bg-slate-200"
      }`}>
        {sender.charAt(0)}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className={`text-sm font-medium ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>{sender}</div>
          <div className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-600"}`}>{time}</div>
        </div>
        <div className={`text-xs mt-1 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{message}</div>
                </div>
      {unread && (
        <div className="flex-shrink-0 self-center">
          <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
            </div>
          )}
    </div>
  )
})
CommunicationItem.displayName = "CommunicationItem"

// Add missing imports
function Info(props: React.ComponentProps<typeof AlertCircle>) {
  return <AlertCircle {...props} />
}

function Check(props: React.ComponentProps<typeof Shield>) {
  return <Shield {...props} />
}
