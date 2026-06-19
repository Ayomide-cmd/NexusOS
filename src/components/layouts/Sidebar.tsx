'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, MessageSquare, Layers, Mail, BookOpen,
  Settings, AlertCircle,
} from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { ME } from '@/data/users';

const NAV = [
  { href: '/dashboard',  label: 'Dashboard', Icon: LayoutDashboard,  badge: null },
  { href: '/pulse',      label: 'Pulse',     Icon: MessageSquare,    badge: 12   },
  { href: '/forge',      label: 'Forge',     Icon: Layers,           badge: 8    },
  { href: '/courier',    label: 'Courier',   Icon: Mail,             badge: 4    },
  { href: '/atlas',      label: 'Atlas',     Icon: BookOpen,         badge: null },
];

export function Sidebar({ onCmdK }: { onCmdK: () => void }) {
  const path = usePathname();

  return (
    <aside className="w-[220px] min-w-[220px] bg-[#111720] border-r border-[#1E2D42] flex flex-col overflow-hidden">
      {/* Logo */}
      <div className="h-[52px] flex items-center gap-2 px-4 border-b border-[#1E2D42] shrink-0">
        <div className="w-[22px] h-[22px] bg-blue-500 rounded-[5px] flex items-center justify-center text-[11px] font-bold text-white">N</div>
        <span className="text-[13px] font-semibold text-[#D4DDE8] tracking-tight">NexusOS</span>
        <span className="text-[10px] text-[#4E6580] ml-0.5">v1</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 overflow-y-auto">
        <div className="mb-1">
          {NAV.map(({ href, label, Icon, badge }) => {
            const active = path.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-2.5 py-[6px] rounded text-[13px] font-[450] transition-colors mb-0.5 ${
                  active
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'text-[#8899AA] hover:bg-[#1C2535] hover:text-[#D4DDE8]'
                }`}
              >
                <Icon size={14} className="shrink-0" />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                    label === 'Pulse' ? 'bg-red-500 text-white' : 'bg-[#1C2535] text-[#4E6580]'
                  }`}>
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="border-t border-[#1E2D42] pt-2 mt-2">
          <Link
            href="/settings"
            className={`flex items-center gap-2 px-2.5 py-[6px] rounded text-[13px] font-[450] transition-colors ${
              path === '/settings' ? 'bg-blue-500/10 text-blue-400' : 'text-[#8899AA] hover:bg-[#1C2535] hover:text-[#D4DDE8]'
            }`}
          >
            <Settings size={14} />
            Settings
          </Link>
        </div>

        {/* Incident alert */}
        <div className="mt-3 mx-1 bg-red-500/5 border border-red-500/20 rounded-md p-2.5">
          <div className="flex items-center gap-1.5 mb-1">
            <AlertCircle size={11} className="text-red-400" />
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Incident Active</span>
          </div>
          <Link href="/forge/ENG-244" className="text-[11px] text-[#8899AA] hover:text-[#D4DDE8] leading-snug block transition-colors">
            ENG-244 · Safari Login Failure
          </Link>
        </div>
      </nav>

      {/* User */}
      <div className="border-t border-[#1E2D42] p-2">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#1C2535] cursor-pointer transition-colors">
          <Avatar userId={ME.id} size="sm" />
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-medium text-[#D4DDE8] truncate">{ME.name}</div>
            <div className="text-[10px] text-[#4E6580] truncate">{ME.role}</div>
          </div>
          <button
            onClick={onCmdK}
            className="text-[10px] text-[#4E6580] bg-[#1C2535] border border-[#1E2D42] rounded px-1 py-0.5 hover:text-[#8899AA] transition-colors cursor-pointer"
            title="Open command palette"
          >
            ⌘K
          </button>
        </div>
      </div>
    </aside>
  );
}
