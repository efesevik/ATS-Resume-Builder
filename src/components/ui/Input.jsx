import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Input = ({ label, className, ...props }) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>}
    <input
      className={twMerge(
        "flex h-9 w-full rounded-md border border-gray-200 bg-white px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
);

export const Button = ({ children, variant = 'primary', className, ...props }) => {
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    outline: "border border-gray-200 bg-white text-black hover:bg-gray-100",
    danger: "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 hover:border-red-200",
    ghost: "text-gray-500 hover:text-black hover:bg-gray-100",
  };

  return (
    <button
      className={twMerge(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
