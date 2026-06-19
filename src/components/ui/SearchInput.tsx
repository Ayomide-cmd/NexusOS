'use client';
import { Search } from 'lucide-react';
import { InputHTMLAttributes } from 'react';

export function SearchInput({ placeholder = 'Search...', className = '', ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`flex items-center gap-2 bg-[#1C2535] border border-[#1E2D42] rounded px-2.5 py-1.5 min-w-[180px] ${className}`}>
      <Search size={12} className="text-[#4E6580] shrink-0" />
      <input
        className="bg-transparent border-none outline-none text-[12px] text-[#D4DDE8] placeholder:text-[#4E6580] w-full font-sans"
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
}
