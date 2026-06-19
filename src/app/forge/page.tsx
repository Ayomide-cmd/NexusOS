'use client';
import { useState } from 'react';
import Link from 'next/link';
import { tickets } from '@/data/tickets';
import { getUser } from '@/data/users';
import { PriorityBadge, StatusBadge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { SearchInput } from '@/components/ui/SearchInput';

const TABS = [
  { id: 'all',  label: 'All Tickets' },
  { id: 'mine', label: 'My Tickets'  },
];

export default function Forge() {
  const [tab, setTab] = useState('all');
  const [q, setQ] = useState('');
  const filtered = tickets.filter(t =>
    t.title.toLowerCase().includes(q.toLowerCase()) ||
    t.id.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="h-[52px] bg-[#111720] border-b border-[#1E2D42] flex items-center gap-3 px-5 shrink-0">
        <span className="text-[13px] font-semibold text-[#D4DDE8]">Forge</span>
        <div className="ml-auto flex items-center gap-2">
          <SearchInput placeholder="Search tickets..." value={q} onChange={e => setQ(e.target.value)} />
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[12px] font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors cursor-pointer">
            + New ticket
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex border-b border-[#1E2D42] mb-5">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-3.5 py-2 text-[12px] font-medium border-b-2 -mb-px transition-colors cursor-pointer bg-transparent ${
                tab === t.id ? 'text-blue-400 border-blue-400' : 'text-[#4E6580] border-transparent hover:text-[#8899AA]'
              }`}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-1.5">
          {filtered.map(t => {
            const assignee = getUser(t.assignee);
            return (
              <Link key={t.id} href={`/forge/${t.id}`}
                className="flex items-center gap-3 px-3.5 py-3 bg-[#161D28] border border-[#1E2D42] rounded-md hover:border-[#243448] transition-colors">
                <span className="text-[11px] font-semibold text-[#4E6580] font-mono min-w-[64px]">{t.id}</span>
                <span className="flex-1 text-[13px] font-medium text-[#D4DDE8] truncate">{t.title}</span>
                <div className="flex items-center gap-2 shrink-0">
                  <PriorityBadge priority={t.priority} />
                  <StatusBadge status={t.status} />
                  {assignee && <Avatar userId={t.assignee} size="sm" />}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
