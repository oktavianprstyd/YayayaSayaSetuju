"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  percentage: number;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeConfig = {
  sm: { width: 80, height: 80, strokeWidth: 6, fontSize: "text-sm" },
  md: { width: 120, height: 120, strokeWidth: 8, fontSize: "text-lg" },
  lg: { width: 160, height: 160, strokeWidth: 10, fontSize: "text-2xl" },
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  label,
  size = "md",
  className,
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const config = sizeConfig[size];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(Math.min(100, Math.max(0, percentage)));
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const radius = (config.width - config.strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedPercentage / 100) * circumference;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${label || "Progress"} ${percentage} persen`}
    >
      <svg
        width={config.width}
        height={config.height}
        className="transform -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={config.width / 2}
          cy={config.height / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={config.strokeWidth}
          fill="none"
          className="text-gray-200"
        />
        <circle
          cx={config.width / 2}
          cy={config.height / 2}
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={config.strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-in-out"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={cn(
            "font-bold text-emerald-700 transition-all duration-300",
            config.fontSize
          )}
          aria-hidden="true"
        >
          {animatedPercentage}%
        </span>
        {label && (
          <span className="text-xs text-slate-600 mt-1 text-center px-2" aria-hidden="true">
            {label}
          </span>
        )}
      </div>

      <span className="sr-only">
        {label || "Progress"} {percentage} persen
      </span>
    </div>
  );
};

export default ProgressBar;
