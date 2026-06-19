'use client';
import { use } from 'react';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MessageSquare, BookOpen } from 'lucide-react';
import { getTicket } from '@/data/tickets';
import { getUser } from '@/data/users';
import { getChannel } from '@/data/messages';
import { getDoc } from '@/data/docs';
import { Avatar } from '@/components/ui/Avatar';
import { PriorityBadge, StatusBadge } from '@/components/ui/Badge';
import { LinkChip } from '@/components/ui/LinkChip';
import { useInvestigation } from '@/lib/store/investigation';

export default function TicketDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { markVisited } = useInvestigation();
  const t = getTicket(id);

  useEffect(() => {
    if (id === 'ENG-244') markVisited('ticket');
  }, [id, markVisited]);

  if (!t) return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="h-[52px] bg-[#111720] border-b border-[#1E2D42] flex items-center gap-2 px-5 shrink-0">
        <button onClick={() => router.back()} className="text-[#4E6580] hover:text-[#D4DDE8] transition-colors cursor-pointer bg-transparent border-none p-0">
          <ArrowLeft size={14} />
        </button>
        <span className="text-[13px] font-semibold text-[#D4DDE8]">Ticket not found</span>
      </div>
      <div className="flex-1 flex items-center justify-center text-[#4E6580] text-[13px]">No ticket with ID {id}</div>
    </div>
  );

  const assignee = getUser(t.assignee);
  const reporter = getUser(t.reporter);
  const linkedChannel = t.linkedSlack ? getChannel(t.linkedSlack) : null;
  const linkedDoc = t.linkedWiki ? getDoc(t.linkedWiki) : null;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="h-[52px] bg-[#111720] border-b border-[#1E2D42] flex items-center gap-2 px-5 shrink-0">
        <button onClick={() => router.push('/forge')} className="text-[#4E6580] hover:text-[#D4DDE8] transition-colors cursor-pointer bg-transparent border-none p-0 flex items-center gap-1">
          <ArrowLeft size={14} />
        </button>
        <div className="flex items-center gap-1.5 text-[12px] text-[#4E6580]">
          <Link href="/forge" className="hover:text-[#D4DDE8] transition-colors">Forge</Link>
          <span>›</span>
          <span className="text-[#D4DDE8] font-mono font-semibold">{t.id}</span>
        </div>
        <div className="ml-auto flex gap-2">
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[12px] font-medium bg-[#1C2535] text-[#D4DDE8] border border-[#1E2D42] hover:border-[#243448] transition-colors cursor-pointer">Edit</button>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[12px] font-medium text-[#8899AA] hover:bg-[#1C2535] transition-colors cursor-pointer bg-transparent border-none">···</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-5">
          <div className="text-[11px] font-semibold text-[#4E6580] font-mono mb-2">{t.id}</div>
          <h1 className="text-[20px] font-bold text-[#D4DDE8] tracking-tight mb-3 leading-tight">{t.title}</h1>
          <div className="flex items-center gap-2 flex-wrap">
            <StatusBadge status={t.status} />
            <PriorityBadge priority={t.priority} />
            {t.tags.map(tag => (
              <span key={tag} className="text-[10px] px-2 py-0.5 bg-[#1C2535] border border-[#1E2D42] rounded-full text-[#4E6580] font-medium">{tag}</span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[1fr_240px] gap-5 items-start">
          <div>
            <p className="text-[13px] text-[#8899AA] leading-relaxed mb-5">{t.description}</p>

            {linkedChannel && (
              <div className="mb-4">
                <div className="text-[10px] font-semibold text-[#4E6580] uppercase tracking-widest mb-2">Linked Thread</div>
                <LinkChip
                  icon={<MessageSquare size={11} />}
                  label={`#${linkedChannel.name}`}
                  onClick={() => router.push(`/pulse/${linkedChannel.id}`)}
                />
              </div>
            )}

            {linkedDoc && (
              <div className="mb-4">
                <div className="text-[10px] font-semibold text-[#4E6580] uppercase tracking-widest mb-2">Linked Wiki Page</div>
                <LinkChip
                  icon={<BookOpen size={11} />}
                  label={linkedDoc.title}
                  onClick={() => router.push(`/atlas/${linkedDoc.id}`)}
                />
              </div>
            )}

            <div className="mt-6">
              <div className="text-[13px] font-semibold text-[#D4DDE8] mb-3">Comments ({t.comments.length})</div>
              {t.comments.length === 0 && <p className="text-[12px] text-[#4E6580]">No comments yet.</p>}
              {t.comments.map(c => {
                const author = getUser(c.author);
                return (
                  <div key={c.id} className="flex gap-2.5 mb-4">
                    <Avatar userId={c.author} size="sm" />
                    <div className="flex-1 bg-[#161D28] border border-[#1E2D42] rounded-md p-3">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[12px] font-semibold text-[#D4DDE8]">{author?.name}</span>
                        <span className="text-[10px] text-[#4E6580]">{new Date(c.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-[12px] text-[#8899AA] leading-relaxed">{c.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-[#161D28] border border-[#1E2D42] rounded-md overflow-hidden">
            {[
              { key: 'Assignee',  val: assignee ? <span className="flex items-center gap-1.5"><Avatar userId={t.assignee} size="sm" />{assignee.name}</span> : '—' },
              { key: 'Reporter',  val: reporter ? <span className="flex items-center gap-1.5"><Avatar userId={t.reporter} size="sm" />{reporter.name}</span> : '—' },
              { key: 'Status',    val: <StatusBadge status={t.status} /> },
              { key: 'Priority',  val: <PriorityBadge priority={t.priority} /> },
              { key: 'Created',   val: <span className="text-[#4E6580]">{new Date(t.created).toLocaleDateString()}</span> },
              { key: 'Updated',   val: <span className="text-[#4E6580]">{new Date(t.updated).toLocaleDateString()}</span> },
            ].map(({ key, val }) => (
              <div key={key} className="flex items-center gap-3 px-3.5 py-2.5 border-b border-[#1E2D42] last:border-0">
                <span className="text-[11px] text-[#4E6580] font-medium min-w-[72px]">{key}</span>
                <span className="text-[12px] text-[#D4DDE8] flex items-center gap-1.5">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
