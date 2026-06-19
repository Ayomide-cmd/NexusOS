'use client';
import Link from 'next/link';
import { AlertCircle, MessageSquare, Layers, Mail } from 'lucide-react';

const stats = [
  { label: 'Critical Incidents', value: '1',  sub: 'ENG-244 is active',  color: 'text-red-400'   },
  { label: 'Unread Messages',    value: '12', sub: 'Across 4 channels',  color: 'text-[#D4DDE8]' },
  { label: 'Pending Tickets',    value: '8',  sub: '3 high priority',    color: 'text-amber-400'  },
  { label: 'New Emails',         value: '4',  sub: '2 unread',           color: 'text-[#D4DDE8]' },
];

const activity = [
  { icon: '💬', text: 'Sarah Chen posted in #frontend about the Safari incident', time: '10m ago', href: '/pulse/ch-frontend' },
  { icon: '📋', text: 'Daniel Park commented on ENG-244',                         time: '2h ago',  href: '/forge/ENG-244'     },
  { icon: '✉️', text: 'New email from Acme Corp about login failures',             time: '5h ago',  href: '/courier/e1'        },
  { icon: '📄', text: 'Daniel Park updated OAuth Authentication on Atlas',         time: '5d ago',  href: '/atlas/w-oauth'     },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="h-[52px] bg-[#111720] border-b border-[#1E2D42] flex items-center px-5 shrink-0">
        <span className="text-[13px] font-semibold text-[#D4DDE8]">Dashboard</span>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <h1 className="text-[18px] font-bold text-[#D4DDE8] tracking-tight mb-1">Good morning, Alex</h1>
          <p className="text-[12px] text-[#4E6580]">Monday, January 15, 2024 · 1 active incident</p>
        </div>
        <div className="grid grid-cols-4 gap-3 mb-6">
          {stats.map(s => (
            <div key={s.label} className="bg-[#161D28] border border-[#1E2D42] rounded-md p-4">
              <div className="text-[11px] text-[#4E6580] font-medium mb-2">{s.label}</div>
              <div className={`text-[28px] font-bold tracking-tight leading-none mb-1 ${s.color}`}>{s.value}</div>
              <div className="text-[10px] text-[#4E6580]">{s.sub}</div>
            </div>
          ))}
        </div>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-semibold text-[#D4DDE8]">Active Incidents</span>
            <Link href="/forge" className="text-[12px] text-[#4E6580] hover:text-[#D4DDE8] transition-colors">View all →</Link>
          </div>
          <Link href="/forge/ENG-244" className="flex items-center gap-3 p-3 bg-red-500/5 border border-red-500/20 rounded-md mb-2 hover:border-red-500/30 transition-colors">
            <AlertCircle size={14} className="text-red-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-medium text-[#D4DDE8] mb-0.5">ENG-244 — Safari Login Failure</div>
              <div className="text-[11px] text-[#4E6580]">Critical · Assigned to Sarah Chen · Updated 14:47</div>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full uppercase tracking-wide shrink-0">Critical</span>
          </Link>
          <Link href="/forge/ENG-231" className="flex items-center gap-3 p-3 bg-[#161D28] border border-[#1E2D42] rounded-md hover:border-[#243448] transition-colors">
            <div className="w-[7px] h-[7px] rounded-full bg-amber-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-medium text-[#D4DDE8] mb-0.5">ENG-231 — Dashboard Load Time &gt; 4s</div>
              <div className="text-[11px] text-[#4E6580]">High · Assigned to Marcus Webb · Updated Jan 14</div>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full uppercase tracking-wide shrink-0">High</span>
          </Link>
        </div>
        <div className="mb-6">
          <div className="text-[13px] font-semibold text-[#D4DDE8] mb-3">Recent Activity</div>
          {activity.map((a, i) => (
            <Link key={i} href={a.href} className="flex items-center gap-3 p-3 bg-[#161D28] border border-[#1E2D42] rounded-md mb-2 hover:border-[#243448] transition-colors">
              <span className="text-[15px]">{a.icon}</span>
              <span className="flex-1 text-[12px] text-[#D4DDE8]">{a.text}</span>
              <span className="text-[11px] text-[#4E6580] shrink-0">{a.time}</span>
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
            { href: '/pulse/ch-frontend', label: '#frontend',     sub: '10 messages'     },
            { href: '/forge/ENG-244',     label: 'ENG-244',       sub: 'Critical ticket' },
            { href: '/courier/e1',        label: 'Safari Report', sub: 'From Acme Corp'  },
            { href: '/atlas/w-oauth',     label: 'OAuth Auth',    sub: 'Atlas page'      },
          ].map(({ href, label, sub }) => (
            <Link key={href} href={href} className="p-3 bg-[#161D28] border border-[#1E2D42] rounded-md hover:border-[#243448] transition-colors">
              <div className="text-[12px] font-medium text-[#D4DDE8] mb-0.5">{label}</div>
              <div className="text-[11px] text-[#4E6580]">{sub}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
