import React from "react";

export default function Card({ 
  children, 
  className = "",
  variant = "default",
  hover = true,
  style,
}: { 
  children: React.ReactNode
  className?: string
  variant?: "default" | "glass" | "gradient"
  hover?: boolean
  style?: React.CSSProperties
}) {
  const baseStyles = "rounded-2xl border overflow-hidden transition-all duration-300";
  
  const variants: Record<string, string> = {
    default: 
      "border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-soft dark:shadow-lg " +
      (hover ? "hover:shadow-soft-lg dark:hover:shadow-glow hover:border-slate-300 dark:hover:border-slate-600" : ""),
    glass:
      "border-white/20 dark:border-slate-700/50 bg-white/10 dark:bg-slate-900/20 backdrop-blur-2xl shadow-glass " +
      (hover ? "hover:bg-white/15 dark:hover:bg-slate-900/30 hover:shadow-lg" : ""),
    gradient:
      "border-transparent bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 shadow-soft dark:shadow-lg " +
      (hover ? "hover:shadow-soft-lg dark:hover:shadow-glow" : ""),
  };

  return (
    <div 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
