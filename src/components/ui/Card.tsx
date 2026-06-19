import { ReactNode } from 'react';

export function Card({ children, className = '', onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div
      className={`bg-[#161D28] border border-[#1E2D42] rounded-md p-4 transition-colors ${onClick ? 'cursor-pointer hover:border-[#243448]' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
