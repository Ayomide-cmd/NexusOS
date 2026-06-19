import { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

export function LinkChip({ icon, label, onClick }: { icon?: ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded text-[11px] font-medium text-blue-400 hover:bg-blue-500/20 transition-colors cursor-pointer font-sans"
    >
      {icon}
      {label}
      <ArrowRight size={10} />
    </button>
  );
}
