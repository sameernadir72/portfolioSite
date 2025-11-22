"use client";
import React from "react";
import clsx from "clsx";

export default function Button({
  children,
  className,
  variant = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "ghost" }) {
  const base = "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-transform transform focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants: Record<string, string> = {
    default: "bg-primary text-white hover:scale-[1.02]",
    ghost: "bg-transparent border border-slate-200 hover:bg-slate-50",
  };

  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
