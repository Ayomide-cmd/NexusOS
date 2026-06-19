'use client';
import { use, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { channels } from '@/data/messages';
import { getUser } from '@/data/users';
import { getDoc } from '@/data/docs';
import { Avatar } from '@/components/ui/Avatar';
import { LinkChip } from '@/components/ui/LinkChip';
import { Layers, BookOpen } from 'lucide-react';
import { useInvestigation } from '@/lib/store/investigation';

export default function PulseChannel({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { markVisited } = useInvestigation();
  const ch = channels.find(c => c.id === id);

  useEffect(() => {
    if (id === 'ch-frontend') markVisited('slack');
  }, [id, markVisited]);

  return (
    <div className="flex h-full overflow-hidden">
      <div className="h-full overflow-hidden flex flex-col">
        <div className="h-[52px] bg-[#111720] border-b border-[#1E2D42] flex items-center px-5 shrink-0 border-r border-[#1E2D42]">
          <span className="text-[13px] font-semibold text-[#D4DDE8]">Pulse</span>
        </div>
        <div className="w-[180px] overflow-y-auto p-2 border-r border-[#1E2D42] flex-1">
          <div className="text-[10px] font-semibold text-[#4E6580] uppercase tracking-widest px-2 mb-2">Channels</div>
          {channels.map(c => (
            <Link key={c.id} href={`/pulse/${c.id}`}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-[12px] mb-0.5 transition-colors ${
                id === c.id ? 'bg-blue-500/10 text-blue-400' : 'text-[#8899AA] hover:bg-[#1C2535] hover:text-[#D4DDE8]'
              }`}>
              <span className="font-bold text-[#4E6580]">#</span>{c.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-[52px] bg-[#111720] border-b border-[#1E2D42] flex items-center gap-2 px-5 shrink-0">
          {ch ? (
            <>
              <span className="font-bold text-[#4E6580]">#</span>
              <span className="text-[14px] font-semibold text-[#D4DDE8]">{ch.name}</span>
              {ch.linkedTicket && (
                <div className="ml-auto">
                  <LinkChip icon={<Layers size={11} />} label={ch.linkedTicket} onClick={() => router.push(`/forge/${ch.linkedTicket}`)} />
                </div>
              )}
            </>
          ) : (
            <span className="text-[13px] font-semibold text-[#D4DDE8]">Select a channel</span>
          )}
        </div>

        {ch ? (
          <>
            <div className="flex-1 overflow-y-auto p-5">
              {ch.messages.map(m => {
                const user = getUser(m.author);
                return (
                  <div key={m.id} className="flex gap-2.5 mb-5">
                    <Avatar userId={m.author} />
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-[13px] font-semibold text-[#D4DDE8]">{user?.name}</span>
                        <span className="text-[10px] text-[#4E6580] bg-[#1C2535] px-1.5 py-0.5 rounded">{user?.role}</span>
                        <span className="text-[11px] text-[#4E6580]">{m.ts}</span>
                      </div>
                      <p className="text-[13px] text-[#8899AA] leading-relaxed">{m.text}</p>
                      {m.linkedWiki && (() => {
                        const doc = getDoc(m.linkedWiki);
                        return doc ? (
                          <div className="mt-2">
                            <LinkChip icon={<BookOpen size={11} />} label={doc.title} onClick={() => router.push(`/atlas/${doc.id}`)} />
                          </div>
                        ) : null;
                      })()}
                      {m.linkedTicket && (
                        <div className="mt-2">
                          <LinkChip icon={<Layers size={11} />} label={m.linkedTicket} onClick={() => router.push(`/forge/${m.linkedTicket}`)} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-[#1E2D42] p-4">
              <textarea
                className="w-full bg-[#1C2535] border border-[#1E2D42] rounded-md px-3.5 py-2.5 text-[13px] text-[#D4DDE8] placeholder:text-[#4E6580] outline-none resize-none focus:border-blue-500/50 transition-colors font-sans"
                rows={2}
                placeholder={`Message #${ch.name}`}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[#4E6580] text-[13px]">Select a channel</div>
        )}
      </div>
    </div>
  );
}
