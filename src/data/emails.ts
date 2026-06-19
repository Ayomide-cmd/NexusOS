export type Email = {
  id: string;
  from: string;
  fromName: string;
  to: string;
  subject: string;
  preview: string;
  body: string;
  ts: string;
  read: boolean;
  linkedTicket?: string;
};

export const emails: Email[] = [
  {
    id: 'e1',
    from: 'support@acmecorp.com',
    fromName: 'Acme Corp Support',
    to: 'engineering@nexusos.io',
    subject: 'URGENT: Multiple Users Cannot Log In — Safari',
    preview: 'We\'ve had 12 customers report they cannot access their dashboards since this morning...',
    body: `Hi NexusOS team,

We've had 12 customers report that they cannot access their dashboards starting at approximately 9:00 AM today. All affected users are on Safari — both macOS and iOS. Chrome and Firefox users appear unaffected.

Customers are entering their credentials correctly. The login form submits, but they're immediately redirected back to the login page without any error message or explanation.

This is blocking several of our enterprise accounts from accessing critical data. Two customers have already escalated to their account executives.

Can you please prioritize this? We'd appreciate a status update as soon as possible.

Related ticket: ENG-244

Thanks,
Acme Corp Support Team`,
    ts: '09:41',
    read: false,
    linkedTicket: 'ENG-244',
  },
  {
    id: 'e2',
    from: 'alerts@pagerduty.com',
    fromName: 'PagerDuty',
    to: 'oncall@nexusos.io',
    subject: '[HIGH] Staging CI/CD Pipeline Timeout — OPS-122',
    preview: 'A new incident has been triggered on service: Staging CI/CD Pipeline...',
    body: `A new incident has been triggered.

Service: Staging CI/CD Pipeline
Alert: Health check timeout (>30s)
Triggered at: 07:03 AM UTC

Assigned to: Lena Ross
Incident: OPS-122
Runbook: See Atlas → Deployment Runbook

Please acknowledge this alert within 15 minutes.

— PagerDuty`,
    ts: '07:03',
    read: true,
    linkedTicket: 'OPS-122',
  },
  {
    id: 'e3',
    from: 'noreply@github.com',
    fromName: 'GitHub',
    to: 'engineering@nexusos.io',
    subject: 'PR #891 — Fix auth cookie SameSite configuration',
    preview: 'Daniel Park opened a pull request in nexusos/backend: Fix auth cookie SameSite...',
    body: `Daniel Park opened a pull request in nexusos/backend

PR #891: Fix auth cookie SameSite configuration

Changes:
  • Set sameSite: "None" on auth session cookie
  • Ensure secure: true is set in all non-local environments  
  • Add environment guard for local dev (SameSite=Lax, secure=false)
  • Update cookie config documentation

Resolves: ENG-244
Branch: fix/auth-cookie-samesite → main

Review requested from: Sarah Chen, Marcus Webb

View pull request → https://github.com/nexusos/backend/pull/891`,
    ts: '14:33',
    read: false,
    linkedTicket: 'ENG-244',
  },
  {
    id: 'e4',
    from: 'digest@nexusos.io',
    fromName: 'NexusOS Weekly Digest',
    to: 'team@nexusos.io',
    subject: 'Engineering Digest — Week of Jan 15',
    preview: 'This week: 1 critical incident, 12 PRs merged, upcoming deploy freeze...',
    body: `Engineering Weekly Digest
Week of January 15, 2024

INCIDENTS
  • ENG-244: Safari Login Failure — ACTIVE (Critical)
  • ENG-231: Dashboard Performance — In Progress
  • OPS-118: Database Failover — Resolved Jan 12

MERGED THIS WEEK
  12 pull requests merged across 4 repositories.
  Highlights: auth refactor, dashboard caching layer, CSV export fix (in review).

UPCOMING
  • Deploy freeze: Jan 19–21 (holiday weekend)
  • All-hands: Friday 3:00 PM
  • Postmortem for OPS-118: Wednesday 2:00 PM

Stay safe out there,
NexusOS Engineering`,
    ts: '08:00',
    read: true,
    linkedTicket: undefined,
  },
];

export function getEmail(id: string): Email | undefined {
  return emails.find(e => e.id === id);
}
