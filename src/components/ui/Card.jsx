import React from 'react';

const Card = ({ title, icon, children }) => {
  return (
    <div className="bg-white rounded-2xl lg:rounded-[2rem] p-5 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100/80 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 lg:gap-4 mb-5 lg:mb-8">
        {icon && (
          <div className="p-2 lg:p-3 bg-black text-white rounded-xl shadow-xl shadow-black/10 shrink-0">
            {React.cloneElement(icon, { size: 16 })}
          </div>
        )}
        <h2 className="text-base lg:text-xl font-black text-zinc-900 uppercase tracking-tight truncate">
          {title}
        </h2>
      </div>
      <div className="w-full overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default Card;
