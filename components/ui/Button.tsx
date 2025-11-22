"use client";
import React from "react";
import clsx from "clsx";

export default function Button({
  children,
  className,
  variant = "default",
  size = "md",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: "default" | "ghost" | "outline" | "secondary"
  size?: "sm" | "md" | "lg"
}) {
  const base = "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizes: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variants: Record<string, string> = {
    default: 
      "bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg hover:shadow-glow-lg hover:scale-105 hover:from-cyan-600 hover:to-teal-600 dark:shadow-glow",
    secondary:
      "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-glow-lg hover:scale-105 hover:from-purple-700 hover:to-pink-700 dark:shadow-glow",
    ghost:
      "bg-transparent border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500",
    outline:
      "border-2 border-transparent bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-border text-slate-900 dark:text-white hover:shadow-glow hover:scale-105 dark:from-purple-500 dark:to-pink-500",
  };

  return (
    <button 
      className={clsx(base, sizes[size], variants[variant], className)} 
      {...props}
    >
      {children}
    </button>
  );
}
