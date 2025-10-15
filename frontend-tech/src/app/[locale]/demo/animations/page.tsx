'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SiteHeader } from '@/components/SiteHeader';
import { useTranslations } from 'next-intl';
import {
  Sparkles,
  Play,
  MousePointer,
  ArrowRight,
  Heart,
  Star,
  Zap
} from 'lucide-react';
import Link from 'next/link';

export default function AnimationsPage() {
  const t = useTranslations('demo.animations');
  const [showEntrance, setShowEntrance] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [likeCount, setLikeCount] = useState(0);
  const [stars, setStars] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleLike = () => {
    setLikeCount(likeCount + 1);
    const newStar = {
      id: Date.now(),
      x: Math.random() * 100 - 50,
      y: Math.random() * -50 - 20,
    };
    setStars([...stars, newStar]);
    setTimeout(() => {
      setStars((prev) => prev.filter((star) => star.id !== newStar.id));
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container mx-auto px-4 max-w-7xl py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">
            <Sparkles className="h-3 w-3 mr-1" />
            15+ Animations
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('title')}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <Tabs defaultValue="entrance" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 h-auto">
            <TabsTrigger value="entrance">{t('categories.entrance')}</TabsTrigger>
            <TabsTrigger value="hover">{t('categories.hover')}</TabsTrigger>
            <TabsTrigger value="scroll">{t('categories.scroll')}</TabsTrigger>
            <TabsTrigger value="transition">{t('categories.transition')}</TabsTrigger>
            <TabsTrigger value="gesture">{t('categories.gesture')}</TabsTrigger>
            <TabsTrigger value="custom">{t('categories.custom')}</TabsTrigger>
          </TabsList>

          {/* Entrance Animations */}
          <TabsContent value="entrance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fade In & Slide Up</CardTitle>
                <CardDescription>
                  Elements fade in and slide up when they enter the viewport
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => setShowEntrance(!showEntrance)}
                  className="mb-4"
                >
                  <Play className="h-4 w-4 mr-2" />
                  {t('trigger')}
                </Button>

                <AnimatePresence mode="wait">
                  {showEntrance && (
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      {[1, 2, 3].map((item) => (
                        <motion.div key={item} variants={itemVariants}>
                          <Card className="p-6">
                            <h3 className="font-semibold mb-2">Item {item}</h3>
                            <p className="text-sm text-muted-foreground">
                              This card animates into view with a smooth fade and slide.
                            </p>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Scale & Rotate</CardTitle>
                <CardDescription>
                  Elements scale and rotate on entrance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                  }}
                  className="w-32 h-32 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center"
                >
                  <Sparkles className="h-12 w-12 text-white" />
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hover Animations */}
          <TabsContent value="hover" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hover Effects</CardTitle>
                <CardDescription>
                  Interactive hover animations with smooth transitions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((item) => (
                    <motion.div
                      key={item}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      whileTap={{ scale: 0.95 }}
                      onHoverStart={() => setHoveredCard(item)}
                      onHoverEnd={() => setHoveredCard(null)}
                      className="cursor-pointer"
                    >
                      <Card className="p-6 relative overflow-hidden">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: hoveredCard === item ? 1 : 0,
                            y: hoveredCard === item ? 0 : 20,
                          }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-2 right-2"
                        >
                          <MousePointer className="h-5 w-5 text-primary" />
                        </motion.div>
                        <h3 className="font-semibold mb-2">Hover Card {item}</h3>
                        <p className="text-sm text-muted-foreground">
                          Hover over me to see the animation
                        </p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scroll Trigger */}
          <TabsContent value="scroll" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scroll-Triggered Animations</CardTitle>
                <CardDescription>
                  Animations that trigger when scrolling into view
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {[1, 2, 3, 4].map((item) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: item % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: item * 0.1 }}
                  >
                    <Card className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-lg font-bold">{item}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">Scroll Item {item}</h3>
                          <p className="text-sm text-muted-foreground">
                            Animates when scrolled into view
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Page Transitions */}
          <TabsContent value="transition" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Page Transitions</CardTitle>
                <CardDescription>
                  Smooth transitions between different states
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={showEntrance ? 'on' : 'off'}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="p-8 rounded-lg bg-gradient-to-br from-primary/20 to-purple-600/20 text-center"
                    >
                      <h3 className="text-2xl font-bold mb-2">
                        {showEntrance ? 'State A' : 'State B'}
                      </h3>
                      <p className="text-muted-foreground">
                        Content transitions smoothly between states
                      </p>
                    </motion.div>
                  </AnimatePresence>
                  <Button
                    onClick={() => setShowEntrance(!showEntrance)}
                    className="w-full"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Toggle State
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gesture Animations */}
          <TabsContent value="gesture" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gesture-Based Animations</CardTitle>
                <CardDescription>
                  Animations triggered by user interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-6">
                  <motion.div
                    drag
                    dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                    dragElastic={0.2}
                    whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
                    className="w-32 h-32 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center cursor-grab"
                  >
                    <p className="text-white font-semibold text-center text-sm">
                      Drag Me!
                    </p>
                  </motion.div>

                  <div className="relative">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={handleLike}
                      className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg"
                    >
                      <Heart className="h-5 w-5" fill="currentColor" />
                      Like ({likeCount})
                    </motion.button>
                    
                    {stars.map((star) => (
                      <motion.div
                        key={star.id}
                        initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
                        animate={{
                          opacity: 0,
                          x: star.x,
                          y: star.y,
                          scale: 1,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute top-0 left-1/2"
                      >
                        <Star className="h-6 w-6 text-yellow-500" fill="currentColor" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Custom Animations */}
          <TabsContent value="custom" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Custom Animation Combinations</CardTitle>
                <CardDescription>
                  Complex animations combining multiple effects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1.2, 1, 1],
                    rotate: [0, 0, 180, 180, 0],
                    borderRadius: ['10%', '10%', '50%', '50%', '10%'],
                  }}
                  transition={{
                    duration: 2,
                    ease: 'easeInOut',
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  className="w-32 h-32 bg-gradient-to-br from-primary via-purple-600 to-pink-600 mx-auto flex items-center justify-center"
                >
                  <Zap className="h-12 w-12 text-white" />
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <section className="mt-12 text-center">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Explore More Demos
              </h3>
              <p className="text-muted-foreground mb-6">
                Check out other interactive demonstrations of modern web technologies.
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

