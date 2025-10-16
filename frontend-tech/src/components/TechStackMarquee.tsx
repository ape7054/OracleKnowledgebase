import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { techStack } from "@/config/tech-stack";
import { IconType } from "react-icons";

// 直接使用共享配置
const technologies = techStack.map(tech => ({
  name: tech.name,
  icon: tech.icon,
  color: tech.colorClass,
}));

interface TechCardProps {
  name: string;
  icon: IconType;
  color: string;
}

const TechCard = ({ name, icon: Icon, color }: TechCardProps) => {
  return (
    <div
      className={cn(
        "relative flex cursor-pointer items-center justify-center rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm transition-all hover:scale-105 hover:shadow-lg",
        // 响应式尺寸和间距
        "h-24 w-28 mx-2",           // 移动端：更小巧
        "sm:h-28 sm:w-36 sm:mx-3",  // 小平板：中等
        "md:h-32 md:w-40 md:mx-4",  // 平板：适中
        "lg:w-44 lg:mx-5",          // 桌面：更宽敞
        "dark:bg-card/50 dark:hover:bg-card/70"
      )}
    >
      <div className="flex flex-col items-center gap-1.5 sm:gap-2 md:gap-3 p-3 sm:p-4 md:p-5">
        <Icon className={cn(
          "text-3xl sm:text-4xl md:text-5xl", // 响应式图标大小
          color
        )} />
        <p className="text-xs sm:text-sm md:text-base font-semibold text-center line-clamp-1">
          {name}
        </p>
      </div>
    </div>
  );
};

interface TechStackMarqueeProps {
  title?: string;
  subtitle?: string;
}

export function TechStackMarquee({ title, subtitle }: TechStackMarqueeProps) {
  const firstRow = technologies.slice(0, technologies.length / 2);
  const secondRow = technologies.slice(technologies.length / 2);

  return (
    <section className="relative w-full overflow-hidden py-6 sm:py-8 md:py-10">
      {/* 标题 */}
      {(title || subtitle) && (
        <div className="mb-8 sm:mb-10 md:mb-12 text-center px-4">
          {title && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
          )}
          {subtitle && (
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">{subtitle}</p>
          )}
        </div>
      )}

      {/* 第一行：从左到右 */}
      <Marquee 
        pauseOnHover 
        repeat={2} 
        className="[--duration:25s] sm:[--duration:40s] md:[--duration:50s]"
      >
        {firstRow.map((tech) => (
          <TechCard key={tech.name} {...tech} />
        ))}
      </Marquee>

      {/* 第二行：从右到左 */}
      <Marquee 
        reverse 
        pauseOnHover 
        repeat={2} 
        className="[--duration:25s] sm:[--duration:40s] md:[--duration:50s]"
      >
        {secondRow.map((tech) => (
          <TechCard key={tech.name} {...tech} />
        ))}
      </Marquee>

      {/* 渐变遮罩 - 响应式宽度 */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 sm:w-1/3 md:w-1/3 bg-gradient-to-r from-background via-background/50 to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 sm:w-1/3 md:w-1/3 bg-gradient-to-l from-background via-background/50 to-transparent"></div>
    </section>
  );
} 