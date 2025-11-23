import * as React from "react";

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement> & { className?: string }> = ({ children, className = "", ...props }) => {
  return (
    <label
      {...props}
      className={`block text-sm font-semibold text-slate-700 dark:text-slate-200 ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
