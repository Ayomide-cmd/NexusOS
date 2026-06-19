'use client';
import Link from 'next/link';
import { emails } from '@/data/emails';

export default function CourierInbox() {
  return (
    <div className="flex h-full overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="h-[52px] bg-[#111720] border-b border-[#1E2D42] flex items-center px-5 shrink-0 border-r border-[#1E2D42] w-[280px]">
          <span className="text-[13px] font-semibold text-[#D4DDE8]">Courier</span>
          <button className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[12px] font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors cursor-pointer border-none">
            Compose
          </button>
        </div>
        <div className="w-[280px] overflow-y-auto border-r border-[#1E2D42] flex-1">
          <div className="px-4 py-2.5 border-b border-[#1E2D42] text-[11px] font-semibold text-[#4E6580] uppercase tracking-widest">Inbox</div>
          {emails.map(e => (
            <Link key={e.id} href={`/courier/${e.id}`}
              className={`block px-4 py-3 border-b border-[#1E2D42] hover:bg-[#1C2535] transition-colors relative ${!e.read ? 'pl-6' : ''}`}>
              {!e.read && <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-400" />}
              <div className={`text-[12px] mb-0.5 ${!e.read ? 'font-semibold text-[#D4DDE8]' : 'text-[#8899AA]'}`}>{e.fromName}</div>
              <div className="text-[12px] text-[#8899AA] truncate mb-0.5">{e.subject}</div>
              <div className="text-[11px] text-[#4E6580] truncate">{e.preview}</div>
              <div className="absolute top-3 right-3 text-[10px] text-[#4E6580]">{e.ts}</div>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center text-[#4E6580]">
        <div className="text-center">
          <div className="text-[28px] mb-2">✉️</div>
          <div className="text-[13px] font-medium text-[#8899AA]">Select an email</div>
          <div className="text-[12px] mt-1">Choose a message from your inbox</div>
        </div>
      </div>
    </div>
  );
}
