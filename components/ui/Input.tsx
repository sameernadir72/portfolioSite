"use client";
import React from "react";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-primary" {...props} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-primary" {...props} />;
}
