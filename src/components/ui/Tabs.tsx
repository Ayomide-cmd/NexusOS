'use client';

interface Tab { id: string; label: string; }

interface TabsProps {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="flex border-b border-[#1E2D42] mb-5">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`px-3.5 py-2 text-[12px] font-medium border-b-2 -mb-px transition-colors cursor-pointer bg-transparent font-sans ${
            active === t.id
              ? 'text-blue-400 border-blue-400'
              : 'text-[#4E6580] border-transparent hover:text-[#8899AA]'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
