import { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

const variants: Record<Variant, string> = {
  primary:   'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-[#1C2535] text-[#D4DDE8] border border-[#1E2D42] hover:border-[#243448] hover:bg-[#161D28]',
  ghost:     'text-[#8899AA] hover:bg-[#1C2535] hover:text-[#D4DDE8]',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[12px] font-medium transition-colors cursor-pointer whitespace-nowrap font-sans ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
