"use client";
import React, { useState } from "react";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [isFocused, setIsFocused] = useState(false);
  const { className, ...rest } = props;

  return (
    <input
      className={`
        w-full px-4 py-3 rounded-xl text-sm
        bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm
        border border-slate-200 dark:border-slate-700
        text-slate-900 dark:text-slate-100
        placeholder:text-slate-500 dark:placeholder:text-slate-400
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400
        focus:border-transparent focus:shadow-lg focus:bg-white dark:focus:bg-slate-900
        hover:border-slate-300 dark:hover:border-slate-600
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className || ""}
      `}
      onFocus={(e) => {
        setIsFocused(true);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        setIsFocused(false);
        props.onBlur?.(e);
      }}
      {...rest}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [isFocused, setIsFocused] = useState(false);
  const { className, ...rest } = props;

  return (
    <textarea
      className={`
        w-full px-4 py-3 rounded-xl text-sm
        bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm
        border border-slate-200 dark:border-slate-700
        text-slate-900 dark:text-slate-100
        placeholder:text-slate-500 dark:placeholder:text-slate-400
        transition-all duration-300 resize-none
        focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400
        focus:border-transparent focus:shadow-lg focus:bg-white dark:focus:bg-slate-900
        hover:border-slate-300 dark:hover:border-slate-600
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className || ""}
      `}
      onFocus={(e) => {
        setIsFocused(true);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        setIsFocused(false);
        props.onBlur?.(e);
      }}
      {...rest}
    />
  );
}
