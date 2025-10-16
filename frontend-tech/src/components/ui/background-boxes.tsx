"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const BREAKPOINTS = {
  sm: 768,
  md: 1024,
  lg: 1440,
};

type GridSize = {
  rows: number;
  cols: number;
};

const DEFAULT_GRID: GridSize = { rows: 36, cols: 27 };

const computeGrid = (width?: number): GridSize => {
  if (!width) return DEFAULT_GRID;

  if (width < BREAKPOINTS.sm) {
    return { rows: 24, cols: 18 };
  }

  if (width < BREAKPOINTS.md) {
    return { rows: 48, cols: 36 };
  }

  if (width < BREAKPOINTS.lg) {
    return { rows: 72, cols: 54 };
  }

  return { rows: 96, cols: 72 };
};

const COLORS = [
  "#93c5fd",
  "#f9a8d4",
  "#86efac",
  "#fde047",
  "#fca5a5",
  "#d8b4fe",
  "#93c5fd",
  "#a5b4fc",
  "#c4b5fd",
];

const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const [gridSize, setGridSize] = useState<GridSize>(DEFAULT_GRID);

  useEffect(() => {
    const updateGrid = () => setGridSize(computeGrid(window.innerWidth));

    updateGrid();
    window.addEventListener("resize", updateGrid, { passive: true });

    return () => window.removeEventListener("resize", updateGrid);
  }, []);

  const rows = useMemo(() => Array.from({ length: gridSize.rows }), [gridSize.rows]);
  const cols = useMemo(() => Array.from({ length: gridSize.cols }), [gridSize.cols]);

  return (
    <div
      style={{
        transform: `translate(0%,-20%) skewX(-48deg) skewY(14deg) scale(1.2) rotate(0deg) translateZ(0)`,
        pointerEvents: "none",
      }}
      className={cn(
        "absolute -top-1/4 left-1/4 z-0 flex h-[160%] w-[160%] -translate-x-1/2 -translate-y-1/2 p-4",
        className,
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row-${i}`}
          style={{ pointerEvents: "auto" }}
          className="relative h-8 w-16 border-l border-slate-600"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: `${getRandomColor()}`,
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col-${i}-${j}`}
              style={{ pointerEvents: "auto" }}
              className="relative h-8 w-16 border-t border-r border-slate-600"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="pointer-events-none absolute -top-[14px] -left-[22px] h-6 w-10 stroke-[1px] text-slate-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
