"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface MeteorsProps {
  number?: number;
  minDelay?: number;
  maxDelay?: number;
  minDuration?: number;
  maxDuration?: number;
  angle?: number;
  className?: string;
}

export const Meteors = ({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 15,
  angle = 300,
  className,
}: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    [],
  );

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      "--angle": -angle + "deg",
      top: "0%",
      left: `${Math.floor(Math.random() * 100)}%`,
      animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + "s",
      animationDuration:
        Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) +
        "s",
    }));
    setMeteorStyles(styles);
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle]);

  return (
    <>
      {[...meteorStyles].map((style, idx) => (
        // Meteor tail
        <span
          key={idx}
          style={style as React.CSSProperties}
          className={cn(
            "pointer-events-none absolute size-0 rotate-[var(--angle)] animate-meteor",
            className,
          )}
        >
          {/* Meteor head */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-[2px] w-[80px] -translate-y-1/2 bg-gradient-to-r from-transparent via-foreground/30 to-foreground/60 shadow-[0_0_8px_hsl(var(--foreground)/0.4)] rounded-none" />
        </span>
      ))}
    </>
  );
};
