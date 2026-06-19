'use client';
import { use, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { emails } from '@/data/emails';
import { getEmail } from '@/data/emails';
import { LinkChip } from '@/components/ui/LinkChip';
import { Layers } from 'lucide-react';
import { useInvestigation } from '@/lib/store/investigation';

export default function EmailDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { markVisited } = useInvestigation();
  const email = getEmail(id);

  useEffect(() => {
    if (id === 'e1') markVisited('email');
  }, [id, markVisited]);

  return (
    <div className="flex h-full overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="h-[52px] bg-[#111720] border-b border-[#1E2D42] flex items-center px-5 shrink-0 border-r border-[#1E2D42] w-[280px]">
          <span className="text-[13px] font-semibold text-[#D4DDE8]">Courier</span>
          <button className="ml-auto inline-flex items-center px-3 py-1.5 rounded text-[12px] font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors cursor-pointer border-none">
            Compose
          </button>
        </div>
        <div className="w-[280px] overflow-y-auto border-r border-[#1E2D42] flex-1">
          <div className="px-4 py-2.5 border-b border-[#1E2D42] text-[11px] font-semibold text-[#4E6580] uppercase tracking-widest">Inbox</div>
          {emails.map(e => (
            <Link key={e.id} href={`/courier/${e.id}`}
              className={`block px-4 py-3 border-b border-[#1E2D42] transition-colors relative ${id === e.id ? 'bg-blue-500/10' : 'hover:bg-[#1C2535]'} ${!e.read ? 'pl-6' : ''}`}>
              {!e.read && <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-400" />}
              <div className={`text-[12px] mb-0.5 ${!e.read ? 'font-semibold text-[#D4DDE8]' : 'text-[#8899AA]'}`}>{e.fromName}</div>
              <div className="text-[12px] text-[#8899AA] truncate mb-0.5">{e.subject}</div>
              <div className="text-[11px] text-[#4E6580] truncate">{e.preview}</div>
              <div className="absolute top-3 right-3 text-[10px] text-[#4E6580]">{e.ts}</div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {email ? (
          <>
            <h1 className="text-[18px] font-bold text-[#D4DDE8] tracking-tight mb-4 leading-tight">{email.subject}</h1>
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#1E2D42] flex-wrap">
              <div className="w-7 h-7 rounded-full bg-[#4E6580] flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                {email.fromName.charAt(0)}
              </div>
              <div>
                <div className="text-[13px] font-medium text-[#D4DDE8]">{email.fromName}</div>
                <div className="text-[11px] text-[#4E6580]">{email.from} → {email.to}</div>
              </div>
              <div className="ml-auto text-[11px] text-[#4E6580]">{email.ts}</div>
            </div>
            {email.linkedTicket && (
              <div className="mb-4">
                <LinkChip icon={<Layers size={11} />} label={email.linkedTicket} onClick={() => router.push(`/forge/${email.linkedTicket}`)} />
              </div>
            )}
            <pre className="text-[13px] text-[#8899AA] leading-[1.8] whitespace-pre-wrap font-sans">{email.body}</pre>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-[#4E6580] text-[13px]">Email not found</div>
        )}
      </div>
    </div>
  );
}
