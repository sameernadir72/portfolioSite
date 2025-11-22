"use client";
import React from "react";
import clsx from "clsx";

export default function IconButton({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={clsx('inline-flex items-center justify-center rounded-md p-2 hover:bg-slate-100 transition', className)}>
      {children}
    </button>
  );
}
