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
        "relative mx-6 flex h-32 w-44 cursor-pointer items-center justify-center rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm transition-all hover:scale-105 hover:shadow-lg",
        "dark:bg-card/50 dark:hover:bg-card/70"
      )}
    >
      <div className="flex flex-col items-center gap-3 p-6">
        <Icon className={cn("text-5xl", color)} />
        <p className="text-base font-semibold">{name}</p>
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
    <section className="relative w-full overflow-hidden py-8">
      {/* 标题 */}
      {(title || subtitle) && (
        <div className="mb-12 text-center">
          {title && (
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
          )}
          {subtitle && (
            <p className="mt-2 text-muted-foreground">{subtitle}</p>
          )}
        </div>
      )}

      {/* 第一行：从左到右 */}
      <Marquee pauseOnHover repeat={2} className="[--duration:50s]">
        {firstRow.map((tech) => (
          <TechCard key={tech.name} {...tech} />
        ))}
      </Marquee>

      {/* 第二行：从右到左 */}
      <Marquee reverse pauseOnHover repeat={2} className="[--duration:50s]">
        {secondRow.map((tech) => (
          <TechCard key={tech.name} {...tech} />
        ))}
      </Marquee>

      {/* 渐变遮罩 - 扩大阴影范围 */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background via-background/50 to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background via-background/50 to-transparent"></div>
    </section>
  );
} 