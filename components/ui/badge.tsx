import * as React from "react";

export const Badge: React.FC<React.PropsWithChildren<{ className?: string; variant?: "secondary" | "primary" }>> = ({ children, className = "", variant = "secondary" }) => {
  const base = "inline-flex items-center rounded-full text-sm font-medium";
  const variantClasses =
    variant === "secondary"
      ? "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-100"
      : "bg-blue-100 text-blue-800";

  return <span className={`${base} ${variantClasses} ${className}`}>{children}</span>;
};

export default Badge;
