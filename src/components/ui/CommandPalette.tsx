'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

const ITEMS = [
  { icon: '📋', label: 'ENG-244 — Safari Login Failure',    meta: 'Forge',   href: '/forge/ENG-244'       },
  { icon: '📋', label: 'ENG-231 — Dashboard Load Time',     meta: 'Forge',   href: '/forge/ENG-231'       },
  { icon: '📋', label: 'ENG-220 — Export CSV Missing',      meta: 'Forge',   href: '/forge/ENG-220'       },
  { icon: '📋', label: 'OPS-122 — Staging Deploy Failing',  meta: 'Forge',   href: '/forge/OPS-122'       },
  { icon: '💬', label: '#frontend',                         meta: 'Pulse',   href: '/pulse/ch-frontend'   },
  { icon: '💬', label: '#performance',                      meta: 'Pulse',   href: '/pulse/ch-performance'},
  { icon: '💬', label: '#general',                          meta: 'Pulse',   href: '/pulse/ch-general'    },
  { icon: '💬', label: '#ops-alerts',                       meta: 'Pulse',   href: '/pulse/ch-ops-alerts' },
  { icon: '✉️', label: 'Safari Login Failures — Acme Corp', meta: 'Courier', href: '/courier/e1'          },
  { icon: '✉️', label: 'PR #891 — Fix auth cookie',         meta: 'Courier', href: '/courier/e3'          },
  { icon: '📄', label: 'OAuth Authentication',              meta: 'Atlas',   href: '/atlas/w-oauth'       },
  { icon: '📄', label: 'Deployment Runbook',                meta: 'Atlas',   href: '/atlas/w-deploy'      },
  { icon: '📄', label: 'Incident Response',                 meta: 'Atlas',   href: '/atlas/w-incident'    },
  { icon: '📄', label: 'Frontend Standards',                meta: 'Atlas',   href: '/atlas/w-frontend'    },
];

export function CommandPalette({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState('');
  const [focused, setFocused] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = q
    ? ITEMS.filter(i => i.label.toLowerCase().includes(q.toLowerCase()) || i.meta.toLowerCase().includes(q.toLowerCase()))
    : ITEMS;

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => { setFocused(0); }, [q]);

  const go = (href: string) => { router.push(href); onClose(); };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape')     { onClose(); return; }
    if (e.key === 'ArrowDown')  { e.preventDefault(); setFocused(f => Math.min(f + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp')    { e.preventDefault(); setFocused(f => Math.max(f - 1, 0)); }
    if (e.key === 'Enter' && filtered[focused]) go(filtered[focused].href);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center pt-28" onClick={onClose}>
      <div
        className="bg-[#111720] border border-[#243448] rounded-xl w-[520px] max-h-[380px] overflow-hidden flex flex-col shadow-2xl"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKey}
      >
        <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-[#1E2D42]">
          <Search size={14} className="text-[#4E6580]" />
          <input
            ref={inputRef}
            className="flex-1 bg-transparent border-none outline-none text-[14px] text-[#D4DDE8] placeholder:text-[#4E6580] font-sans"
            placeholder="Jump to ticket, channel, page..."
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          <kbd className="text-[10px] text-[#4E6580] bg-[#1C2535] border border-[#1E2D42] rounded px-1.5 py-0.5">esc</kbd>
        </div>
        <div className="overflow-y-auto p-2">
          {filtered.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded cursor-pointer transition-colors ${i === focused ? 'bg-[#1C2535]' : 'hover:bg-[#1C2535]'}`}
              onClick={() => go(item.href)}
              onMouseEnter={() => setFocused(i)}
            >
              <span className="text-[14px] w-5 text-center">{item.icon}</span>
              <span className="flex-1 text-[13px] text-[#D4DDE8]">{item.label}</span>
              <span className="text-[11px] text-[#4E6580]">{item.meta}</span>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="py-8 text-center text-[12px] text-[#4E6580]">No results for &quot;{q}&quot;</div>
          )}
        </div>
      </div>
    </div>
  );
}
