'use client';
import { useInvestigation, TrailStep } from '@/lib/store/investigation';
import { CheckCircle2, Circle, Bot } from 'lucide-react';

const STEPS: { key: TrailStep; label: string; sub: string }[] = [
  { key: 'ticket', label: 'Open Ticket ENG-244',        sub: 'Forge · Safari Login Failure'        },
  { key: 'slack',  label: 'Read #frontend thread',      sub: 'Pulse · Linked to ENG-244'           },
  { key: 'email',  label: 'Check Courier inbox',        sub: 'Support report from Acme Corp'       },
  { key: 'wiki',   label: 'Read OAuth Authentication',  sub: 'Atlas · Cookie configuration'        },
];

export function AgentPanel() {
  const { visited, isComplete } = useInvestigation();
  const complete = isComplete();
  const count = visited.size;

  return (
    <aside className="w-[272px] min-w-[272px] bg-[#111720] border-l border-[#1E2D42] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-[52px] flex items-center gap-2 px-4 border-b border-[#1E2D42] shrink-0">
        <div className="relative">
          <Bot size={16} className="text-[#4E6580]" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        </div>
        <span className="text-[12px] font-semibold text-[#D4DDE8]">Investigation Agent</span>
        <span className="ml-auto text-[10px] text-[#4E6580]">Session active</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {/* Goal */}
        <div>
          <div className="text-[10px] font-semibold text-[#4E6580] uppercase tracking-widest mb-2">Current Goal</div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-md p-3 text-[12px] text-blue-300 leading-relaxed">
            Investigate the Safari login failure and identify the root cause.
          </div>
        </div>

        {/* Trail */}
        <div>
          <div className="text-[10px] font-semibold text-[#4E6580] uppercase tracking-widest mb-2">
            Investigation Trail
          </div>
          <div className="flex flex-col">
            {STEPS.map((step, i) => {
              const done = visited.has(step.key);
              return (
                <div key={step.key} className="flex gap-3 py-2.5 border-b border-[#1E2D42] last:border-0">
                  {done
                    ? <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    : <Circle size={15} className="text-[#1E2D42] shrink-0 mt-0.5" />
                  }
                  <div>
                    <div className={`text-[12px] font-medium leading-snug ${done ? 'text-[#D4DDE8]' : 'text-[#4E6580]'}`}>
                      {step.label}
                    </div>
                    <div className="text-[11px] text-[#4E6580] mt-0.5">{step.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Conclusion */}
        <div>
          <div className="text-[10px] font-semibold text-[#4E6580] uppercase tracking-widest mb-2">Conclusion</div>
          {complete ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-md p-3 text-[12px] text-emerald-300 leading-relaxed">
              <div className="font-semibold mb-1">🔍 Root cause identified</div>
              Auth cookie missing{' '}
              <code className="bg-white/10 px-1 py-0.5 rounded text-[11px] font-mono">sameSite=&quot;None&quot;</code>
              {' '}and{' '}
              <code className="bg-white/10 px-1 py-0.5 rounded text-[11px] font-mono">secure=true</code>
              {' '}— required for cross-origin cookies in Safari. Fix is in PR #891.
            </div>
          ) : (
            <div className="text-[11px] text-[#4E6580] leading-relaxed">
              Visit all four trail steps to complete the investigation.
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="mt-auto pt-3 border-t border-[#1E2D42]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-[#4E6580]">{count}/4 steps visited</span>
            <span className="text-[10px] text-[#4E6580]">{Math.round((count / 4) * 100)}%</span>
          </div>
          <div className="h-1 bg-[#1C2535] rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${(count / 4) * 100}%` }}
            />
          </div>
          <div className="text-[10px] text-[#4E6580] mt-2">Investigating ENG-244</div>
        </div>
      </div>
    </aside>
  );
}
