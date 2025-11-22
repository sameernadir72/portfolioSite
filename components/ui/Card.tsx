import React from "react";

export default function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border bg-white shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
