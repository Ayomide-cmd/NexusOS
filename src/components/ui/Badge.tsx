import { Priority, TicketStatus } from '@/data/tickets';

const priorityStyles: Record<Priority, string> = {
  critical: 'bg-red-500/10 text-red-400 border border-red-500/20',
  high:     'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  medium:   'bg-violet-500/10 text-violet-400 border border-violet-500/20',
  low:      'bg-[#1C2535] text-[#4E6580] border border-[#1E2D42]',
};

const statusStyles: Record<TicketStatus, string> = {
  critical:     'bg-red-500/10 text-red-400 border border-red-500/20',
  'in-progress':'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  open:         'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  done:         'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
};

const statusLabels: Record<TicketStatus, string> = {
  critical: 'Critical', 'in-progress': 'In Progress', open: 'Open', done: 'Done',
};

const base = 'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide';

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span className={`${base} ${priorityStyles[priority]}`}>
      {priority}
    </span>
  );
}

export function StatusBadge({ status }: { status: TicketStatus }) {
  return (
    <span className={`${base} ${statusStyles[status]}`}>
      {statusLabels[status]}
    </span>
  );
}
