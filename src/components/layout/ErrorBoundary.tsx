"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="p-4 bg-rose-50 text-rose-600 rounded-full">
            <AlertTriangle className="h-10 w-10 animate-bounce" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">
            Terjadi Kesalahan Sistem
          </h2>
          <p className="text-sm text-slate-500 max-w-sm">
            Maaf atas ketidaknyamanannya. Coba segarkan halaman atau kembali lagi nanti.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-md text-sm font-semibold hover:bg-emerald-700 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Segarkan Halaman</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
