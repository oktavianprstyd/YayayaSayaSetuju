"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: {
    direction: "up" | "down";
    percent: number;
  };
  color?: "emerald" | "blue" | "amber" | "rose";
  className?: string;
}

const colorConfig = {
  emerald: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
    border: "border-emerald-100",
  },
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
    border: "border-blue-100",
  },
  amber: {
    bg: "bg-amber-50",
    icon: "text-amber-600",
    border: "border-amber-100",
  },
  rose: {
    bg: "bg-rose-50",
    icon: "text-rose-600",
    border: "border-rose-100",
  },
};

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  trend,
  color = "emerald",
  className,
}) => {
  const colors = colorConfig[color];

  return (
    <div
      className={cn(
        "bg-white border border-gray-200 rounded-xl p-5 shadow-sm transition-all duration-150 hover:shadow-md hover:-translate-y-0.5",
        className
      )}
      role="region"
      aria-label={`${label}: ${value}${trend ? `, ${trend.direction === "up" ? "naik" : "turun"} ${trend.percent}%` : ""}`}
    >
      <div className="flex items-center justify-between text-slate-400 mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
        <div className={cn("p-2 rounded-lg", colors.bg, colors.icon)} aria-hidden="true">
          {icon}
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-slate-800">{value}</span>
        
        {trend && (
          <span
            className={cn(
              "inline-flex items-center text-xs font-semibold",
              trend.direction === "up" ? "text-emerald-600" : "text-rose-600"
            )}
            aria-label={`${trend.direction === "up" ? "Naik" : "Turun"} ${trend.percent}%`}
          >
            {trend.direction === "up" ? (
              <TrendingUp className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
            )}
            {trend.percent}%
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
