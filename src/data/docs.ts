export type DocBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'code'; language: string; text: string }
  | { type: 'callout'; variant: 'warning' | 'info' | 'danger'; text: string }
  | { type: 'list'; items: string[] };

export type Doc = {
  id: string;
  title: string;
  category: string;
  lastUpdated: string;
  updatedBy: string;
  content: DocBlock[];
};

export const docs: Doc[] = [
  {
    id: 'w-oauth',
    title: 'OAuth Authentication',
    category: 'Engineering',
    lastUpdated: '2024-01-10',
    updatedBy: 'u3',
    content: [
      {
        type: 'paragraph',
        text: 'This document describes how NexusOS handles OAuth authentication flows, session management, and cookie configuration across all environments.',
      },
      { type: 'heading', text: 'Overview' },
      {
        type: 'paragraph',
        text: 'NexusOS uses server-side session cookies for authentication. The API lives at api.nexusos.io and the frontend at app.nexusos.io — making this a cross-origin setup that requires specific cookie configuration to work correctly across all browsers.',
      },
      { type: 'heading', text: 'Cookie Configuration' },
      {
        type: 'paragraph',
        text: 'Authentication sessions are maintained via secure, HTTP-only cookies. The following configuration is required for cross-origin auth to work correctly:',
      },
      {
        type: 'code',
        language: 'javascript',
        text: `// Required cookie settings for cross-origin auth
res.cookie("session", token, {
  httpOnly: true,
  secure: true,           // REQUIRED alongside sameSite=None
  sameSite: "None",       // REQUIRED for cross-origin requests
  domain: ".nexusos.io",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});`,
      },
      {
        type: 'callout',
        variant: 'warning',
        text: 'Safari strictly enforces SameSite cookie policies. Without sameSite="None" AND secure=true, cookies will not be set on Safari in cross-origin contexts — causing silent authentication failures with no error shown to the user.',
      },
      { type: 'heading', text: 'Browser Compatibility' },
      {
        type: 'paragraph',
        text: 'Different browsers handle SameSite policies differently. Here\'s what you need to know:',
      },
      {
        type: 'list',
        items: [
          'Chrome / Edge: Accept SameSite=Lax for most cross-origin flows.',
          'Firefox: Generally permissive, accepts Lax in most cases.',
          'Safari: Requires explicit sameSite=None with the secure flag. Omitting either will result in the cookie being silently dropped — no error, no warning.',
          'Safari (iOS): Same strict behavior as macOS Safari.',
        ],
      },
      { type: 'heading', text: 'Local Development' },
      {
        type: 'code',
        language: 'javascript',
        text: `// Local dev override (HTTP, same origin)
res.cookie("session", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
});`,
      },
    ],
  },
  {
    id: 'w-deploy',
    title: 'Deployment Runbook',
    category: 'Operations',
    lastUpdated: '2024-01-08',
    updatedBy: 'u4',
    content: [
      {
        type: 'paragraph',
        text: 'Step-by-step guide for deploying NexusOS services to staging and production environments.',
      },
      { type: 'heading', text: 'Pre-deployment Checklist' },
      {
        type: 'list',
        items: [
          'All tests passing on the target branch.',
          'Database migrations reviewed and reversible.',
          'Feature flags configured for staged rollout.',
          'Runbook updated if deployment introduces new failure modes.',
        ],
      },
      { type: 'heading', text: 'Staging Deploy' },
      {
        type: 'paragraph',
        text: 'Staging deploys run automatically on push to the staging branch. Monitor the #ops-alerts Pulse channel for health check results. The pipeline typically completes in 4–6 minutes.',
      },
      {
        type: 'callout',
        variant: 'info',
        text: 'If the staging health check hangs: check the /health endpoint manually, verify the DB connection string in staging secrets, and restart the ECS task if needed.',
      },
      { type: 'heading', text: 'Production Deploy' },
      {
        type: 'paragraph',
        text: 'Production deploys require approval from two engineers and must happen within the deploy window (Mon–Thu, 10am–3pm UTC). Never deploy on Fridays.',
      },
    ],
  },
  {
    id: 'w-incident',
    title: 'Incident Response',
    category: 'Operations',
    lastUpdated: '2024-01-05',
    updatedBy: 'u4',
    content: [
      {
        type: 'paragraph',
        text: 'How to handle production incidents at NexusOS — from initial detection through resolution and post-mortem.',
      },
      { type: 'heading', text: 'Severity Levels' },
      {
        type: 'list',
        items: [
          'P0 (Critical): Full service outage, data loss risk, or authentication broken for all users.',
          'P1 (High): Major feature broken, significant user impact.',
          'P2 (Medium): Degraded experience, workaround available.',
          'P3 (Low): Minor issues, cosmetic bugs.',
        ],
      },
      { type: 'heading', text: 'Response Protocol' },
      {
        type: 'list',
        items: [
          'Acknowledge the PagerDuty alert within 15 minutes.',
          'Assign an incident commander.',
          'Post in #general with current status and impact.',
          'Open or update the Forge ticket.',
          'Communicate ETA to stakeholders every 30 minutes.',
          'Resolve, then schedule a post-mortem within 48 hours.',
        ],
      },
    ],
  },
  {
    id: 'w-frontend',
    title: 'Frontend Standards',
    category: 'Engineering',
    lastUpdated: '2024-01-03',
    updatedBy: 'u1',
    content: [
      {
        type: 'paragraph',
        text: 'Code style, component patterns, and tooling standards for the NexusOS frontend.',
      },
      { type: 'heading', text: 'Component Structure' },
      {
        type: 'paragraph',
        text: 'All components live in src/components. Use functional components with hooks only. Prefer composition over inheritance. Every component should have a single, clear responsibility.',
      },
      { type: 'heading', text: 'Styling' },
      {
        type: 'paragraph',
        text: 'We use Tailwind CSS for all styling. No inline styles, no CSS modules. Custom design tokens live in tailwind.config.ts.',
      },
      { type: 'heading', text: 'State Management' },
      {
        type: 'paragraph',
        text: 'Local state with useState/useReducer. Global state with Zustand. Server state with React Query. Do not use Redux.',
      },
    ],
  },
];

export function getDoc(id: string): Doc | undefined {
  return docs.find(d => d.id === id);
}
