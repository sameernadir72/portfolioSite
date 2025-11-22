"use client";
import React from "react";
import clsx from "clsx";

export default function IconButton({ 
  children, 
  className, 
  variant = "ghost",
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "ghost" | "glow" | "gradient" }) {
  const baseStyles = "inline-flex items-center justify-center rounded-lg p-2.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-950";
  
  const variants: Record<string, string> = {
    ghost: "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300",
    glow: "hover:shadow-glow hover:scale-110 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-slate-900",
    gradient: "hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 dark:hover:from-cyan-500/10 dark:hover:to-purple-500/10 hover:scale-110",
  };

  return (
    <button 
      {...props} 
      className={clsx(baseStyles, variants[variant], className)}
    >
      {children}
    </button>
  );
}
