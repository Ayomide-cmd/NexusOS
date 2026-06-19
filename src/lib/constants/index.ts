export const NAV = [
  { id: 'dashboard', label: 'Dashboard',  href: '/dashboard',  icon: 'LayoutDashboard' },
  { id: 'pulse',     label: 'Pulse',      href: '/pulse',      icon: 'MessageSquare',  badge: 12 },
  { id: 'forge',     label: 'Forge',      href: '/forge',      icon: 'Layers',         badge: 8  },
  { id: 'courier',   label: 'Courier',    href: '/courier',    icon: 'Mail',           badge: 4  },
  { id: 'atlas',     label: 'Atlas',      href: '/atlas',      icon: 'BookOpen'        },
] as const;

export const PRIORITY_CONFIG = {
  critical: { label: 'Critical', class: 'badge-critical' },
  high:     { label: 'High',     class: 'badge-high'     },
  medium:   { label: 'Medium',   class: 'badge-medium'   },
  low:      { label: 'Low',      class: 'badge-low'      },
} as const;

export const STATUS_CONFIG = {
  'critical':    { label: 'Critical',    class: 'badge-critical'    },
  'in-progress': { label: 'In Progress', class: 'badge-inprogress'  },
  'open':        { label: 'Open',        class: 'badge-open'        },
  'done':        { label: 'Done',        class: 'badge-done'        },
} as const;
