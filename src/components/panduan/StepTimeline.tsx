"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  urutan: number;
  judul: string;
  deskripsi: string;
  tips?: string;
}

interface StepTimelineProps {
  steps: Step[];
  currentStep?: number;
  onStepChange?: (step: number) => void;
  className?: string;
}

export const StepTimeline: React.FC<StepTimelineProps> = ({
  steps,
  currentStep,
  onStepChange,
  className,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent, stepNumber: number) => {
    if (e.key === "ArrowDown" && stepNumber < steps.length) {
      e.preventDefault();
      onStepChange?.(stepNumber + 1);
    } else if (e.key === "ArrowUp" && stepNumber > 1) {
      e.preventDefault();
      onStepChange?.(stepNumber - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onStepChange?.(stepNumber);
    }
  };

  return (
    <ol
      className={cn("relative border-l-2 border-emerald-100 ml-3 pl-6 space-y-6", className)}
      role="list"
      aria-label="Langkah-langkah panduan"
    >
      {steps.map((step) => {
        const isActive = currentStep === step.urutan;
        const isCompleted = currentStep !== undefined && currentStep > step.urutan;

        return (
          <li
            key={step.urutan}
            role="listitem"
            aria-current={isActive ? "step" : undefined}
            className="relative"
          >
            <button
              onClick={() => onStepChange?.(step.urutan)}
              onKeyDown={(e) => handleKeyDown(e, step.urutan)}
              className="absolute -left-[35px] top-0.5 flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ring-4 ring-white transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              style={{
                backgroundColor: isActive ? "#059669" : isCompleted ? "#10B981" : "#E5E7EB",
                color: isActive || isCompleted ? "#FFFFFF" : "#374151",
              }}
              aria-label={`Langkah ${step.urutan}: ${step.judul}${isActive ? " (aktif)" : ""}${isCompleted ? " (selesai)" : ""}`}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              ) : (
                step.urutan
              )}
            </button>

            <div className="space-y-1">
              <h5 className="text-sm font-bold text-slate-800">{step.judul}</h5>
              <p className="text-xs text-slate-600 leading-relaxed">{step.deskripsi}</p>
              
              {step.tips && (
                <div
                  className="bg-amber-50 border-l-2 border-amber-500 p-2 rounded text-xs text-amber-800 mt-2"
                  role="note"
                  aria-label="Tips"
                >
                  <strong>Tips:</strong> {step.tips}
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default StepTimeline;
