'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SiteHeader } from '@/components/SiteHeader';
import { useTranslations } from 'next-intl';
import { Grid3x3, Check, Copy } from 'lucide-react';
import Link from 'next/link';

export default function ComponentsPage() {
  const t = useTranslations('demo.components');
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(60);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container mx-auto px-4 max-w-7xl py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Grid3x3 className="h-3 w-3 mr-1" />
            70+ Components
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('title')}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Component Categories Tabs */}
        <Tabs defaultValue="buttons" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 h-auto">
            <TabsTrigger value="buttons">{t('categories.buttons')}</TabsTrigger>
            <TabsTrigger value="forms">{t('categories.forms')}</TabsTrigger>
            <TabsTrigger value="layout">{t('categories.layout')}</TabsTrigger>
            <TabsTrigger value="feedback">{t('categories.feedback')}</TabsTrigger>
            <TabsTrigger value="navigation">{t('categories.navigation')}</TabsTrigger>
            <TabsTrigger value="data">{t('categories.data')}</TabsTrigger>
          </TabsList>

          {/* Buttons Tab */}
          <TabsContent value="buttons" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Button Component</CardTitle>
                <CardDescription>
                  Displays a button with various styles and sizes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Button Variants */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold">Variants</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="default">Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>

                <Separator />

                {/* Button Sizes */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold">Sizes</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>

                <Separator />

                {/* Code Example */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">Code Example</h3>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyCode('<Button variant="default">Click me</Button>')}
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          {t('copied')}
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          {t('copy')}
                        </>
                      )}
                    </Button>
                  </div>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{`<Button variant="default">Click me</Button>`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Badge Component */}
            <Card>
              <CardHeader>
                <CardTitle>Badge Component</CardTitle>
                <CardDescription>
                  Displays a badge or a component that looks like a badge
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Forms Tab */}
          <TabsContent value="forms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Component</CardTitle>
                <CardDescription>
                  Displays a list of options for the user to pick from
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select>
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select a framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="vue">Vue</SelectItem>
                    <SelectItem value="svelte">Svelte</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Layout Tab */}
          <TabsContent value="layout" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Card Component</CardTitle>
                <CardDescription>
                  Displays a card with header, content, and footer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Simple Card</CardTitle>
                      <CardDescription>Card description goes here</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        This is a simple card component with header and content.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Another Card</CardTitle>
                      <CardDescription>With more content</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Cards are great for organizing content in a structured way.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Separator Component</CardTitle>
                <CardDescription>
                  Visually or semantically separates content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>Some content above</div>
                <Separator />
                <div>Some content below</div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dialog Component</CardTitle>
                <CardDescription>
                  A modal dialog that interrupts the user with important content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Example Dialog</DialogTitle>
                      <DialogDescription>
                        This is an example dialog with a title and description.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm text-muted-foreground">
                        Dialog content goes here. You can add any components inside.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress Component</CardTitle>
                <CardDescription>
                  Displays an indicator showing the completion progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={progress} className="w-full" />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setProgress(Math.max(0, progress - 10))}
                  >
                    -10
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setProgress(Math.min(100, progress + 10))}
                  >
                    +10
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Navigation Tab */}
          <TabsContent value="navigation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tabs Component</CardTitle>
                <CardDescription>
                  A set of layered sections of content—known as tab panels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="tab1" className="w-full">
                  <TabsList>
                    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1">Content for Tab 1</TabsContent>
                  <TabsContent value="tab2">Content for Tab 2</TabsContent>
                  <TabsContent value="tab3">Content for Tab 3</TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Tab */}
          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Avatar Component</CardTitle>
                <CardDescription>
                  An image element with a fallback for representing the user
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accordion Component</CardTitle>
                <CardDescription>
                  A vertically stacked set of interactive headings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Is it styled?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It comes with default styles that you can customize.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Is it animated?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It&apos;s animated by default with smooth transitions.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <section className="mt-12 text-center">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                More Components Available
              </h3>
              <p className="text-muted-foreground mb-6">
                This is just a preview. The project includes 70+ fully functional components.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/demo">
                  <Button size="lg" variant="outline">
                    Back to Demos
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

