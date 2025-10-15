import React from 'react'

// UI Components
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { BorderBeam } from '@/components/ui/border-beam'
import { BlurFade } from '@/components/ui/blur-fade'
import { NumberTicker } from '@/components/ui/number-ticker'
import { Marquee } from '@/components/ui/marquee'
import { ThemeToggle } from '@/components/ThemeToggle'
import { DevelopmentBadge } from '@/components/DevelopmentBadge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { toast } from '@/hooks/use-toast'
import { ChartContainer, ChartTooltip } from '@/components/ui/chart'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'
import { AnimatedBeam } from '@/components/ui/animated-beam'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { ContainerTextFlip } from '@/components/ui/container-text-flip'
import { IconCloud } from '@/components/ui/icon-cloud'
import { SparklesCore } from '@/components/ui/sparkles'
import { WarpBackground } from '@/components/ui/warp-background'
import { Meteors } from '@/components/ui/meteors'
import { ChevronDown, Code, Database, Globe, Layers, Zap, Cloud, Cpu, Server, Terminal, Package, GitBranch, Smartphone, Monitor, Tablet, Coffee, Heart, Star, Sun, Moon } from 'lucide-react'
import { useRef } from 'react'

export interface ComponentItem {
  id: string
  name: string
  category: string
  description: string
  component: React.ComponentType<Record<string, unknown>>
  codeExample: string
  props?: Record<string, unknown>
  variants?: Array<{
    name: string
    props: Record<string, unknown>
    description?: string
  }>
}

export const componentCategories = {
  all: { name: '全部组件', icon: 'Command' },
  basic: { name: '基础组件', icon: 'Zap' },
  forms: { name: '表单组件', icon: 'Settings' },
  layout: { name: '布局组件', icon: 'Activity' },
  navigation: { name: '导航组件', icon: 'Globe' },
  feedback: { name: '反馈组件', icon: 'AlertCircle' },
  data: { name: '数据展示', icon: 'Database' },
  animations: { name: '动效组件', icon: 'Sparkles' },
  composite: { name: '复合组件', icon: 'Layers' },
  business: { name: '业务组件', icon: 'Download' }
} as const

export const showcaseComponents: ComponentItem[] = [
  // 特色动效组件 - Meteors
  {
    id: 'meteors',
    name: 'Meteors',
    category: 'animations',
    description: '流星雨效果，动态背景装饰组件',
    component: ({ theme }: { theme?: string }) => (
      <div className={`relative w-full h-64 overflow-hidden rounded-lg ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-950 to-slate-900"
          : "bg-gradient-to-br from-slate-200 to-slate-300"
      }`}>
        <Meteors number={30} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <h3 className={`text-2xl font-bold mb-2 ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}>流星雨效果</h3>
            <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>
              动态背景装饰组件
            </p>
          </div>
        </div>
      </div>
    ),
    codeExample: `import { Meteors } from '@/components/ui/meteors'

<div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-950 to-slate-900">
  <Meteors number={30} />
  <div className="absolute inset-0 flex items-center justify-center">
    <h3 className="text-2xl font-bold text-white">流星雨效果</h3>
  </div>
</div>`,
    variants: [
      { 
        name: '默认(30个)', 
        props: {},
        description: '默认配置，30个流星'
      },
    ]
  },
  // 基础组件
  {
    id: 'button',
    name: 'Button',
    category: 'basic',
    description: '按钮组件，支持多种样式和尺寸',
    component: Button,
    codeExample: `import { Button } from '@/components/ui/button'

<Button variant="default">
  Default Button
</Button>`,
    variants: [
      { name: 'Default', props: { variant: 'default', children: 'Default' } },
      { name: 'Secondary', props: { variant: 'secondary', children: 'Secondary' } },
      { name: 'Outline', props: { variant: 'outline', children: 'Outline' } },
      { name: 'Ghost', props: { variant: 'ghost', children: 'Ghost' } },
      { name: 'Link', props: { variant: 'link', children: 'Link' } },
      { name: 'Destructive', props: { variant: 'destructive', children: 'Destructive' } }
    ]
  },
  {
    id: 'badge',
    name: 'Badge',
    category: 'basic',
    description: '徽章组件，用于标签和状态显示',
    component: Badge,
    codeExample: `import { Badge } from '@/components/ui/badge'

<Badge variant="default">
  Default Badge
</Badge>`,
    variants: [
      { name: 'Default', props: { variant: 'default', children: 'Default' } },
      { name: 'Secondary', props: { variant: 'secondary', children: 'Secondary' } },
      { name: 'Outline', props: { variant: 'outline', children: 'Outline' } },
      { name: 'Destructive', props: { variant: 'destructive', children: 'Destructive' } }
    ]
  },
  {
    id: 'avatar',
    name: 'Avatar',
    category: 'basic',
    description: '头像组件，支持图片和文字回退',
    component: () => (
      <Avatar>
        <AvatarImage src="/placeholder.svg" alt="Avatar" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    codeExample: `import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

<Avatar>
  <AvatarImage src="/placeholder.svg" alt="Avatar" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`
  },
  {
    id: 'skeleton',
    name: 'Skeleton',
    category: 'basic',
    description: '骨架屏组件，用于加载状态',
    component: () => (
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    ),
    codeExample: `import { Skeleton } from '@/components/ui/skeleton'

<div className="space-y-2">
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4 w-1/2" />
</div>`
  },
  {
    id: 'separator',
    name: 'Separator',
    category: 'basic',
    description: '分割线组件，用于内容分隔',
    component: () => (
      <div className="w-full space-y-4">
        <div>Content above</div>
        <Separator />
        <div>Content below</div>
      </div>
    ),
    codeExample: `import { Separator } from '@/components/ui/separator'

<div className="space-y-4">
  <div>Content above</div>
  <Separator />
  <div>Content below</div>
</div>`
  },
  {
    id: 'progress',
    name: 'Progress',
    category: 'basic',
    description: '进度条组件，显示任务进度',
    component: () => <Progress value={60} className="w-full" />,
    codeExample: `import { Progress } from '@/components/ui/progress'

<Progress value={60} className="w-full" />`
  },

  // 表单组件
  {
    id: 'input',
    name: 'Input',
    category: 'forms',
    description: '输入框组件，支持多种输入类型',
    component: () => <Input placeholder="请输入内容..." className="w-full max-w-sm" />,
    codeExample: `import { Input } from '@/components/ui/input'

<Input placeholder="请输入内容..." />`
  },
  {
    id: 'label',
    name: 'Label',
    category: 'forms',
    description: '标签组件，用于表单标签',
    component: () => (
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="请输入邮箱..." />
      </div>
    ),
    codeExample: `import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" placeholder="请输入邮箱..." />
</div>`
  },
  {
    id: 'switch',
    name: 'Switch',
    category: 'forms',
    description: '开关组件，用于开关状态',
    component: () => (
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">飞行模式</Label>
      </div>
    ),
    codeExample: `import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">飞行模式</Label>
</div>`
  },
  {
    id: 'slider',
    name: 'Slider',
    category: 'forms',
    description: '滑块组件，用于数值选择',
    component: () => <Slider defaultValue={[50]} max={100} step={1} className="w-full max-w-sm" />,
    codeExample: `import { Slider } from '@/components/ui/slider'

<Slider 
  defaultValue={[50]} 
  max={100} 
  step={1} 
  className="w-full max-w-sm" 
/>`
  },

  // 布局组件
  {
    id: 'card',
    name: 'Card',
    category: 'layout',
    description: '卡片组件，用于内容容器',
    component: () => (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>卡片标题</CardTitle>
          <CardDescription>卡片描述信息</CardDescription>
        </CardHeader>
        <CardContent>
          <p>这是卡片的主要内容区域。</p>
        </CardContent>
        <CardFooter>
          <Button>操作按钮</Button>
        </CardFooter>
      </Card>
    ),
    codeExample: `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>卡片标题</CardTitle>
    <CardDescription>卡片描述信息</CardDescription>
  </CardHeader>
  <CardContent>
    <p>这是卡片的主要内容区域。</p>
  </CardContent>
  <CardFooter>
    <Button>操作按钮</Button>
  </CardFooter>
</Card>`
  },
  {
    id: 'tabs',
    name: 'Tabs',
    category: 'layout',
    description: '标签页组件，用于内容分组',
    component: () => (
      <Tabs defaultValue="tab1" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tab1">标签1</TabsTrigger>
          <TabsTrigger value="tab2">标签2</TabsTrigger>
          <TabsTrigger value="tab3">标签3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="space-y-2">
          <h3 className="text-lg font-semibold">标签1内容</h3>
          <p className="text-sm text-muted-foreground">这是第一个标签页的内容。</p>
        </TabsContent>
        <TabsContent value="tab2" className="space-y-2">
          <h3 className="text-lg font-semibold">标签2内容</h3>
          <p className="text-sm text-muted-foreground">这是第二个标签页的内容。</p>
        </TabsContent>
        <TabsContent value="tab3" className="space-y-2">
          <h3 className="text-lg font-semibold">标签3内容</h3>
          <p className="text-sm text-muted-foreground">这是第三个标签页的内容。</p>
        </TabsContent>
      </Tabs>
    ),
    codeExample: `import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

<Tabs defaultValue="tab1" className="w-full max-w-md">
  <TabsList className="grid w-full grid-cols-3">
    <TabsTrigger value="tab1">标签1</TabsTrigger>
    <TabsTrigger value="tab2">标签2</TabsTrigger>
    <TabsTrigger value="tab3">标签3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    <h3>标签1内容</h3>
    <p>这是第一个标签页的内容。</p>
  </TabsContent>
  {/* 更多 TabsContent... */}
</Tabs>`
  },

  // 导航组件
  {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    category: 'navigation',
    description: '面包屑导航组件',
    component: () => (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">首页</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">组件</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>导航</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
    codeExample: `import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">首页</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="#">组件</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>导航</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`
  },

  // 反馈组件
  {
    id: 'dialog',
    name: 'Dialog',
    category: 'feedback',
    description: '对话框组件，用于弹窗显示',
    component: () => (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">打开对话框</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>对话框标题</DialogTitle>
            <DialogDescription>
              这是对话框的描述信息，用于说明对话框的用途。
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                链接
              </Label>
              <Input
                id="link"
                defaultValue="https://ui.shadcn.com/docs/installation"
                readOnly
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    ),
    codeExample: `import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">打开对话框</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>对话框标题</DialogTitle>
      <DialogDescription>
        这是对话框的描述信息。
      </DialogDescription>
    </DialogHeader>
    {/* 对话框内容 */}
  </DialogContent>
</Dialog>`
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    category: 'feedback',
    description: '工具提示组件，用于悬停提示',
    component: () => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">悬停显示提示</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>这是一个工具提示</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
    codeExample: `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">悬停显示提示</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>这是一个工具提示</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`
  },

  // 数据展示
  {
    id: 'carousel',
    name: 'Carousel',
    category: 'data',
    description: '轮播图组件，用于内容轮播',
    component: () => (
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    ),
    codeExample: `import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'

<Carousel className="w-full max-w-xs">
  <CarouselContent>
    {Array.from({ length: 5 }).map((_, index) => (
      <CarouselItem key={index}>
        <div className="p-1">
          <Card>
            <CardContent className="flex aspect-square items-center justify-center p-6">
              <span className="text-4xl font-semibold">{index + 1}</span>
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`
  },
  {
    id: 'accordion',
    name: 'Accordion',
    category: 'data',
    description: '手风琴组件，用于可折叠内容',
    component: () => (
      <Accordion type="single" collapsible className="w-full max-w-sm">
        <AccordionItem value="item-1">
          <AccordionTrigger>第一个问题</AccordionTrigger>
          <AccordionContent>
            这是第一个问题的答案内容。
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>第二个问题</AccordionTrigger>
          <AccordionContent>
            这是第二个问题的答案内容。
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>第三个问题</AccordionTrigger>
          <AccordionContent>
            这是第三个问题的答案内容。
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
    codeExample: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>第一个问题</AccordionTrigger>
    <AccordionContent>
      这是第一个问题的答案内容。
    </AccordionContent>
  </AccordionItem>
  {/* 更多 AccordionItem... */}
</Accordion>`
  },

  // 动效组件
  {
    id: 'animated-gradient-text',
    name: 'Animated Gradient Text',
    category: 'animations',
    description: '动画渐变文字组件',
    component: () => (
      <AnimatedGradientText>
        动画渐变文字效果
      </AnimatedGradientText>
    ),
    codeExample: `import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'

<AnimatedGradientText>
  动画渐变文字效果
</AnimatedGradientText>`
  },
  {
    id: 'border-beam',
    name: 'Border Beam',
    category: 'animations',
    description: '边框光束动画效果',
    component: () => (
      <div className="relative w-64 h-32 rounded-lg border p-4 flex items-center justify-center bg-background">
        <span className="text-sm">边框光束效果</span>
        <BorderBeam size={250} duration={12} delay={0} />
      </div>
    ),
    codeExample: `import { BorderBeam } from '@/components/ui/border-beam'

<div className="relative rounded-lg border p-4">
  <span>内容</span>
  <BorderBeam size={250} duration={12} delay={0} />
</div>`
  },
  {
    id: 'blur-fade',
    name: 'Blur Fade',
    category: 'animations',
    description: '模糊淡入动画组件',
    component: () => (
      <BlurFade delay={0.25} inView>
        <div className="p-4 rounded-lg bg-muted">
          模糊淡入动画内容
        </div>
      </BlurFade>
    ),
    codeExample: `import { BlurFade } from '@/components/ui/blur-fade'

<BlurFade delay={0.25} inView>
  <div className="p-4 rounded-lg bg-muted">
    模糊淡入动画内容
  </div>
</BlurFade>`
  },
  {
    id: 'number-ticker',
    name: 'Number Ticker',
    category: 'animations',
    description: '数字滚动动画组件',
    component: () => (
      <div className="text-4xl font-bold">
        <NumberTicker value={100} />
      </div>
    ),
    codeExample: `import { NumberTicker } from '@/components/ui/number-ticker'

<div className="text-4xl font-bold">
  <NumberTicker value={100} />
</div>`
  },

  // 复合组件
  {
    id: 'marquee',
    name: 'Marquee',
    category: 'composite',
    description: '跑马灯组件，用于滚动展示',
    component: () => (
      <Marquee className="[--duration:20s]">
        <div className="flex items-center space-x-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="px-4 py-2 bg-primary/10 rounded-md">
              项目 {i + 1}
            </div>
          ))}
        </div>
      </Marquee>
    ),
    codeExample: `import { Marquee } from '@/components/ui/marquee'

<Marquee className="[--duration:20s]">
  <div className="flex items-center space-x-4">
    {Array.from({ length: 10 }).map((_, i) => (
      <div key={i} className="px-4 py-2 bg-primary/10 rounded-md">
        项目 {i + 1}
      </div>
    ))}
  </div>
</Marquee>`
  },

  // 业务组件
  {
    id: 'theme-toggle',
    name: 'Theme Toggle',
    category: 'business',
    description: '主题切换组件',
    component: ThemeToggle,
    codeExample: `import { ThemeToggle } from '@/components/ThemeToggle'

<ThemeToggle />`
  },
  {
    id: 'back-to-top',
    name: 'Back To Top',
    category: 'business',
    description: '回到顶部按钮组件',
    component: () => (
      <div className="flex items-center justify-center p-4">
        <Button size="icon" className="rounded-full">
          ↑
        </Button>
      </div>
    ),
    codeExample: `import { BackToTop } from '@/components/BackToTop'

<BackToTop />`
  },
  {
    id: 'development-badge',
    name: 'Development Badge',
    category: 'business',
    description: '开发中标识组件',
    component: () => <DevelopmentBadge text="开发中" />,
    codeExample: `import { DevelopmentBadge } from '@/components/DevelopmentBadge'

<DevelopmentBadge text="开发中" />`
  },

  // 表单/交互组件 - 新增
  {
    id: 'select',
    name: 'Select',
    category: 'forms',
    description: '下拉选择组件，支持单选',
    component: () => (
      <Select defaultValue="apple">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="选择一个水果" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">苹果</SelectItem>
          <SelectItem value="banana">香蕉</SelectItem>
          <SelectItem value="orange">橙子</SelectItem>
          <SelectItem value="grape">葡萄</SelectItem>
        </SelectContent>
      </Select>
    ),
    codeExample: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

<Select defaultValue="apple">
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="选择一个水果" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">苹果</SelectItem>
    <SelectItem value="banana">香蕉</SelectItem>
    <SelectItem value="orange">橙子</SelectItem>
  </SelectContent>
</Select>`
  },
  {
    id: 'dropdown-menu',
    name: 'Dropdown Menu',
    category: 'forms',
    description: '下拉菜单组件，用于操作菜单',
    component: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">打开菜单</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>个人资料</DropdownMenuItem>
          <DropdownMenuItem>设置</DropdownMenuItem>
          <DropdownMenuItem>帮助</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">退出登录</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    codeExample: `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">打开菜单</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>个人资料</DropdownMenuItem>
    <DropdownMenuItem>设置</DropdownMenuItem>
    <DropdownMenuItem>退出登录</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`
  },
  {
    id: 'popover',
    name: 'Popover',
    category: 'forms',
    description: '气泡弹出框组件，用于显示浮层内容',
    component: () => (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">打开弹出框</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">提示信息</h4>
            <p className="text-sm text-muted-foreground">
              这是一个弹出框组件，可以用来显示额外的信息或操作。
            </p>
          </div>
        </PopoverContent>
      </Popover>
    ),
    codeExample: `import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">打开弹出框</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="space-y-2">
      <h4 className="font-medium">提示信息</h4>
      <p className="text-sm text-muted-foreground">
        这是弹出框的内容
      </p>
    </div>
  </PopoverContent>
</Popover>`
  },
  {
    id: 'collapsible',
    name: 'Collapsible',
    category: 'forms',
    description: '可折叠组件，用于显示/隐藏内容',
    component: function CollapsibleDemo() {
      const [isOpen, setIsOpen] = React.useState(false)
      return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full max-w-sm space-y-2">
          <div className="flex items-center justify-between space-x-4">
            <h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="rounded-md border px-4 py-3 text-sm">
            @radix-ui/primitives
          </div>
          <CollapsibleContent className="space-y-2">
            <div className="rounded-md border px-4 py-3 text-sm">
              @radix-ui/colors
            </div>
            <div className="rounded-md border px-4 py-3 text-sm">
              @stitches/react
            </div>
          </CollapsibleContent>
        </Collapsible>
      )
    },
    codeExample: `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'

const [isOpen, setIsOpen] = useState(false)

<Collapsible open={isOpen} onOpenChange={setIsOpen}>
  <CollapsibleTrigger asChild>
    <Button variant="ghost" size="sm">
      Toggle
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    隐藏的内容
  </CollapsibleContent>
</Collapsible>`
  },

  // 布局组件 - 新增
  {
    id: 'sheet',
    name: 'Sheet',
    category: 'layout',
    description: '抽屉/侧边栏组件，从边缘滑入',
    component: () => (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">打开侧边栏</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>侧边栏标题</SheetTitle>
            <SheetDescription>
              这是一个从右侧滑入的侧边栏组件。
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">侧边栏内容区域</p>
          </div>
        </SheetContent>
      </Sheet>
    ),
    codeExample: `import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">打开侧边栏</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>侧边栏标题</SheetTitle>
      <SheetDescription>
        侧边栏描述信息
      </SheetDescription>
    </SheetHeader>
    {/* 侧边栏内容 */}
  </SheetContent>
</Sheet>`
  },
  {
    id: 'scroll-area',
    name: 'Scroll Area',
    category: 'layout',
    description: '滚动区域组件，提供自定义滚动条',
    component: () => (
      <ScrollArea className="h-[200px] w-full max-w-sm rounded-md border p-4">
        <div className="space-y-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="text-sm">
              滚动项目 {i + 1}
            </div>
          ))}
        </div>
      </ScrollArea>
    ),
    codeExample: `import { ScrollArea } from '@/components/ui/scroll-area'

<ScrollArea className="h-[200px] w-full rounded-md border p-4">
  <div className="space-y-4">
    {Array.from({ length: 20 }).map((_, i) => (
      <div key={i}>滚动项目 {i + 1}</div>
    ))}
  </div>
</ScrollArea>`
  },
  {
    id: 'navigation-menu',
    name: 'Navigation Menu',
    category: 'navigation',
    description: '导航菜单组件，支持下拉子菜单',
    component: () => (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>产品</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-4 w-[400px]">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">产品A</h4>
                  <p className="text-sm text-muted-foreground">产品A的描述信息</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">产品B</h4>
                  <p className="text-sm text-muted-foreground">产品B的描述信息</p>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>解决方案</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-4 w-[400px]">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">企业方案</h4>
                  <p className="text-sm text-muted-foreground">面向企业的解决方案</p>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    ),
    codeExample: `import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu'

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>产品</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid gap-3 p-4 w-[400px]">
          <div>产品内容</div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`
  },
  {
    id: 'resizable',
    name: 'Resizable',
    category: 'layout',
    description: '可调整大小的面板组件',
    component: () => (
      <ResizablePanelGroup direction="horizontal" className="min-h-[200px] max-w-md rounded-lg border">
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">左侧面板</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">右侧面板</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    ),
    codeExample: `import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

<ResizablePanelGroup direction="horizontal" className="min-h-[200px] rounded-lg border">
  <ResizablePanel defaultSize={50}>
    <div className="p-6">左侧面板</div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50}>
    <div className="p-6">右侧面板</div>
  </ResizablePanel>
</ResizablePanelGroup>`
  },

  // 反馈组件 - 新增
  {
    id: 'toast',
    name: 'Toast',
    category: 'feedback',
    description: '消息提示组件，用于显示通知',
    component: () => (
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: "通知标题",
            description: "这是一条消息提示的内容。",
          })
        }}
      >
        显示提示
      </Button>
    ),
    codeExample: `import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'

// 在页面中添加 <Toaster /> 组件
import { Toaster } from '@/components/ui/toaster'

<Button
  onClick={() => {
    toast({
      title: "通知标题",
      description: "这是一条消息提示的内容。",
    })
  }}
>
  显示提示
</Button>

// 在页面底部添加
<Toaster />`
  },

  // 数据展示 - 新增
  {
    id: 'chart',
    name: 'Chart',
    category: 'data',
    description: '图表组件，支持多种图表类型',
    component: function ChartDemo() {
      const chartData = [
        { name: '一月', value: 400 },
        { name: '二月', value: 300 },
        { name: '三月', value: 600 },
        { name: '四月', value: 800 },
        { name: '五月', value: 500 },
      ]
      const chartConfig = {
        value: {
          label: '数值',
          color: 'hsl(var(--primary))',
        },
      }
      return (
        <ChartContainer config={chartConfig} className="h-[200px] w-full max-w-sm">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <ChartTooltip />
            <Bar dataKey="value" fill="var(--color-value)" />
          </BarChart>
        </ChartContainer>
      )
    },
    codeExample: `import { ChartContainer, ChartTooltip } from '@/components/ui/chart'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'

const chartData = [
  { name: '一月', value: 400 },
  { name: '二月', value: 300 },
  { name: '三月', value: 600 },
]

const chartConfig = {
  value: { label: '数值', color: 'hsl(var(--primary))' }
}

<ChartContainer config={chartConfig} className="h-[200px]">
  <BarChart data={chartData}>
    <XAxis dataKey="name" />
    <YAxis />
    <ChartTooltip />
    <Bar dataKey="value" fill="var(--color-value)" />
  </BarChart>
</ChartContainer>`
  },

  // 动画组件 - 新增
  {
    id: 'animated-beam',
    name: 'Animated Beam',
    category: 'animations',
    description: '动画光束连接效果',
    component: function AnimatedBeamDemo() {
      const containerRef = useRef<HTMLDivElement>(null)
      const div1Ref = useRef<HTMLDivElement>(null)
      const div2Ref = useRef<HTMLDivElement>(null)
      
      return (
        <div ref={containerRef} className="relative w-full h-[200px] flex items-center justify-between p-8">
          <div ref={div1Ref} className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
            A
          </div>
          <div ref={div2Ref} className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
            B
          </div>
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div1Ref}
            toRef={div2Ref}
            curvature={0}
            duration={3}
          />
        </div>
      )
    },
    codeExample: `import { AnimatedBeam } from '@/components/ui/animated-beam'
import { useRef } from 'react'

const containerRef = useRef<HTMLDivElement>(null)
const fromRef = useRef<HTMLDivElement>(null)
const toRef = useRef<HTMLDivElement>(null)

<div ref={containerRef} className="relative">
  <div ref={fromRef}>起点</div>
  <div ref={toRef}>终点</div>
  <AnimatedBeam
    containerRef={containerRef}
    fromRef={fromRef}
    toRef={toRef}
  />
</div>`
  },
  {
    id: 'aurora-background',
    name: 'Aurora Background',
    category: 'animations',
    description: '极光背景动画效果',
    component: () => (
      <AuroraBackground className="h-[200px] w-full rounded-lg">
        <div className="relative z-10 flex items-center justify-center h-full">
          <h3 className="text-2xl font-bold text-white">极光效果</h3>
        </div>
      </AuroraBackground>
    ),
    codeExample: `import { AuroraBackground } from '@/components/ui/aurora-background'

<AuroraBackground className="h-[400px]">
  <div className="relative z-10">
    <h1>极光背景内容</h1>
  </div>
</AuroraBackground>`
  },
  {
    id: 'container-text-flip',
    name: 'Container Text Flip',
    category: 'animations',
    description: '容器文字翻转动画',
    component: () => (
      <div className="flex items-center gap-2">
        <span>我是一个</span>
        <ContainerTextFlip
          words={['开发者', '设计师', '创造者', '梦想家']}
          interval={2000}
          className="text-primary"
        />
      </div>
    ),
    codeExample: `import { ContainerTextFlip } from '@/components/ui/container-text-flip'

<ContainerTextFlip
  words={['开发者', '设计师', '创造者']}
  interval={2000}
  className="text-primary"
/>`
  },
  {
    id: 'icon-cloud',
    name: 'Icon Cloud',
    category: 'animations',
    description: '3D图标云旋转效果',
    component: function IconCloudDemo() {
      const icons = [
        <Code key="code" className="w-8 h-8" stroke="#3b82f6" />,
        <Database key="database" className="w-8 h-8" stroke="#22c55e" />,
        <Globe key="globe" className="w-8 h-8" stroke="#06b6d4" />,
        <Layers key="layers" className="w-8 h-8" stroke="#a855f7" />,
        <Zap key="zap" className="w-8 h-8" stroke="#eab308" />,
        <Cloud key="cloud" className="w-8 h-8" stroke="#60a5fa" />,
        <Cpu key="cpu" className="w-8 h-8" stroke="#ef4444" />,
        <Server key="server" className="w-8 h-8" stroke="#94a3b8" />,
        <Terminal key="terminal" className="w-8 h-8" stroke="#4ade80" />,
        <Package key="package" className="w-8 h-8" stroke="#f97316" />,
        <GitBranch key="git" className="w-8 h-8" stroke="#c084fc" />,
        <Smartphone key="smartphone" className="w-8 h-8" stroke="#ec4899" />,
        <Monitor key="monitor" className="w-8 h-8" stroke="#6366f1" />,
        <Tablet key="tablet" className="w-8 h-8" stroke="#14b8a6" />,
        <Coffee key="coffee" className="w-8 h-8" stroke="#f59e0b" />,
        <Heart key="heart" className="w-8 h-8" stroke="#f87171" />,
        <Star key="star" className="w-8 h-8" stroke="#facc15" />,
        <Sun key="sun" className="w-8 h-8" stroke="#fb923c" />,
        <Moon key="moon" className="w-8 h-8" stroke="#94a3b8" />,
      ]
      return (
        <div className="h-[200px] w-full flex items-center justify-center">
          <IconCloud icons={icons} />
        </div>
      )
    },
    codeExample: `import { IconCloud } from '@/components/ui/icon-cloud'
import { Code, Database, Globe } from 'lucide-react'

const icons = [
  <Code key="code" className="w-8 h-8" stroke="#3b82f6" />,
  <Database key="database" className="w-8 h-8" stroke="#22c55e" />,
  <Globe key="globe" className="w-8 h-8" stroke="#06b6d4" />,
  // 更多图标...
]

<IconCloud icons={icons} />`
  },
  {
    id: 'sparkles',
    name: 'Sparkles',
    category: 'animations',
    description: '粒子闪烁特效组件',
    component: () => (
      <div className="relative h-[200px] w-full max-w-sm rounded-lg border bg-slate-950 flex items-center justify-center overflow-hidden">
        <SparklesCore
          id="sparkles-demo"
          background="transparent"
          minSize={1}
          maxSize={3}
          particleDensity={120}
          className="absolute inset-0"
          particleColor="#60A5FA"
          speed={1}
        />
        <span className="relative z-10 text-lg font-semibold text-white">闪烁效果</span>
      </div>
    ),
    codeExample: `import { SparklesCore } from '@/components/ui/sparkles'

<div className="relative">
  <SparklesCore
    id="sparkles"
    background="transparent"
    minSize={1}
    maxSize={3}
    particleDensity={120}
    speed={1}
    particleColor="#60A5FA"
  />
  <div className="relative z-10">内容</div>
</div>`
  },
  {
    id: 'warp-background',
    name: 'Warp Background',
    category: 'animations',
    description: '曲速背景动画效果',
    component: () => (
      <WarpBackground className="h-[200px] w-full rounded-lg">
        <div className="relative z-10 flex items-center justify-center h-full">
          <h3 className="text-2xl font-bold">曲速效果</h3>
        </div>
      </WarpBackground>
    ),
    codeExample: `import { WarpBackground } from '@/components/ui/warp-background'

<WarpBackground className="h-[400px]">
  <div className="relative z-10">
    <h1>曲速背景内容</h1>
  </div>
</WarpBackground>`
  }
]

// 按分类组织组件
export const getComponentsByCategory = (category: string): ComponentItem[] => {
  if (category === 'all') {
    return showcaseComponents
  }
  return showcaseComponents.filter(component => component.category === category)
}

// 获取所有分类
export const getAllCategories = () => {
  return Object.keys(componentCategories)
}

// 获取分类信息
export const getCategoryInfo = (category: string) => {
  return componentCategories[category as keyof typeof componentCategories]
}
