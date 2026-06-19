export type TicketStatus = 'critical' | 'in-progress' | 'open' | 'done';
export type Priority = 'critical' | 'high' | 'medium' | 'low';

export type Comment = {
  id: string;
  author: string;
  text: string;
  ts: string;
};

export type Ticket = {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: Priority;
  assignee: string;
  reporter: string;
  created: string;
  updated: string;
  linkedSlack?: string;
  linkedWiki?: string;
  comments: Comment[];
  tags: string[];
};

export const tickets: Ticket[] = [
  {
    id: 'ENG-244',
    title: 'Safari Login Failure',
    description:
      'Users report that authentication fails immediately after entering valid credentials on Safari browsers. The login form submits successfully, but the session is never established — users are silently redirected back to the login page. Affects all Safari versions on macOS and iOS. Chrome, Firefox, and Edge are unaffected.',
    status: 'critical',
    priority: 'critical',
    assignee: 'u1',
    reporter: 'u5',
    created: '2024-01-15T09:23:00Z',
    updated: '2024-01-15T14:47:00Z',
    linkedSlack: 'ch-frontend',
    linkedWiki: 'w-oauth',
    comments: [
      {
        id: 'c1',
        author: 'u5',
        text: 'Confirmed by 3 separate enterprise customers. 100% reproducible on Safari 17 macOS Sonoma and iOS 17. Chrome and Firefox are clean.',
        ts: '2024-01-15T09:45:00Z',
      },
      {
        id: 'c2',
        author: 'u3',
        text: 'Dug into the auth flow — the session cookie is never being set on Safari. Suspect the SameSite policy is silently blocking it. Cross-referencing the Atlas OAuth page.',
        ts: '2024-01-15T11:12:00Z',
      },
      {
        id: 'c3',
        author: 'u1',
        text: 'Linked the #frontend Slack thread. Daniel\'s analysis looks right — we need sameSite=None and secure=true on the auth cookie. PR incoming.',
        ts: '2024-01-15T14:47:00Z',
      },
    ],
    tags: ['auth', 'safari', 'cookies', 'critical'],
  },
  {
    id: 'ENG-231',
    title: 'Dashboard Load Time > 4s',
    description:
      'The main analytics dashboard is taking over 4 seconds to load for enterprise accounts with large datasets (>10k records). P99 latency has increased from 1.2s to 4.8s since the Jan 10 deploy. Smaller accounts are unaffected.',
    status: 'in-progress',
    priority: 'high',
    assignee: 'u2',
    reporter: 'u4',
    created: '2024-01-12T10:00:00Z',
    updated: '2024-01-14T16:00:00Z',
    linkedSlack: 'ch-performance',
    linkedWiki: undefined,
    comments: [
      {
        id: 'c4',
        author: 'u2',
        text: 'Profiling shows N+1 queries in the aggregation layer. Each widget is making a separate DB call instead of batching. Working on a fix.',
        ts: '2024-01-13T09:00:00Z',
      },
    ],
    tags: ['performance', 'dashboard', 'database'],
  },
  {
    id: 'ENG-220',
    title: 'Export CSV Missing Columns',
    description:
      'CSV export from the Data tab omits custom field columns that were added after the account\'s initial setup date. Default columns export correctly. Affects approximately 40% of enterprise accounts.',
    status: 'open',
    priority: 'medium',
    assignee: 'u5',
    reporter: 'u3',
    created: '2024-01-10T08:30:00Z',
    updated: '2024-01-11T12:00:00Z',
    linkedSlack: undefined,
    linkedWiki: undefined,
    comments: [],
    tags: ['export', 'csv', 'data'],
  },
  {
    id: 'OPS-122',
    title: 'Staging Deployment Failing',
    description:
      'CI/CD pipeline to the staging environment is timing out at the health check step. The health check endpoint hangs for 30s before returning a 504. Production is unaffected. Blocking all staging deploys.',
    status: 'open',
    priority: 'high',
    assignee: 'u4',
    reporter: 'u2',
    created: '2024-01-14T07:00:00Z',
    updated: '2024-01-15T08:00:00Z',
    linkedSlack: undefined,
    linkedWiki: 'w-deploy',
    comments: [],
    tags: ['ops', 'ci-cd', 'staging', 'deploy'],
  },
];

export function getTicket(id: string): Ticket | undefined {
  return tickets.find(t => t.id === id);
}
