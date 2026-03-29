import React from 'react';
import { twMerge } from 'tailwind-merge';

export const TextArea = ({ label, className, ...props }) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>}
    <textarea
      className={twMerge(
        "flex min-h-[100px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
);

export const Card = ({ children, title, icon, className, ...props }) => (
  <div className={twMerge("rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden mb-6", className)} {...props}>
    {title && (
      <div className="border-b border-gray-100 bg-gray-50/30 px-5 py-4 flex items-center gap-3">
        {icon && <div className="text-gray-400">{icon}</div>}
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">{title}</h3>
      </div>
    )}
    <div className="p-5 space-y-5">
      {children}
    </div>
  </div>
);
