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
