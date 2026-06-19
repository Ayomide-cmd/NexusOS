export type Message = {
  id: string;
  author: string;
  text: string;
  ts: string;
  linkedTicket?: string;
  linkedWiki?: string;
};

export type Channel = {
  id: string;
  name: string;
  description: string;
  linkedTicket?: string;
  messages: Message[];
};

export const channels: Channel[] = [
  {
    id: 'ch-frontend',
    name: 'frontend',
    description: 'Frontend engineering discussions',
    linkedTicket: 'ENG-244',
    messages: [
      { id: 'm1',  author: 'u1', text: 'Heads up — getting reports from support that Safari users cannot log in at all. Anyone else seeing this?', ts: '09:24' },
      { id: 'm2',  author: 'u5', text: 'QA confirmed. 100% repro on Safari 17 macOS and iOS. Chrome, Firefox, Edge all clean.', ts: '09:31' },
      { id: 'm3',  author: 'u2', text: 'Tested locally — works fine on Chrome. Must be something browser-specific in how Safari handles the auth response.', ts: '09:38' },
      { id: 'm4',  author: 'u3', text: 'Just dug in — the session cookie is not being set on Safari at all. The Set-Cookie header is present in the response but Safari is dropping it silently.', ts: '10:12' },
      { id: 'm5',  author: 'u1', text: 'That tracks. Safari is strict about SameSite policies on cross-origin requests. What\'s our current cookie config?', ts: '10:14' },
      { id: 'm6',  author: 'u3', text: 'We\'re currently using SameSite=Lax. But for cross-origin auth flows, Safari requires sameSite=None AND secure=true. The Atlas OAuth page has the exact config we need.', ts: '10:31', linkedWiki: 'w-oauth' },
      { id: 'm7',  author: 'u4', text: 'I can push the fix to staging as soon as the cookie config is confirmed and the PR is up.', ts: '10:45' },
      { id: 'm8',  author: 'u1', text: 'Confirmed. Tracking in ENG-244. Daniel, can you open the PR? This is P0.', ts: '11:03', linkedTicket: 'ENG-244' },
      { id: 'm9',  author: 'u3', text: 'PR #891 is up — changes sameSite to None and adds secure=true. Requesting review from Sarah and Marcus.', ts: '14:33' },
      { id: 'm10', author: 'u1', text: 'Reviewing now. Looks correct. Lena, can you merge and deploy to staging once approved?', ts: '14:51' },
    ],
  },
  {
    id: 'ch-performance',
    name: 'performance',
    description: 'Performance monitoring and improvements',
    linkedTicket: 'ENG-231',
    messages: [
      { id: 'm11', author: 'u2', text: 'Dashboard load times are spiking again for enterprise accounts. P99 is at 4.8s.', ts: '10:00' },
      { id: 'm12', author: 'u4', text: 'Infra metrics look healthy — CPU and memory are normal. Likely application-level.', ts: '10:08' },
      { id: 'm13', author: 'u2', text: 'Profiler confirms it. N+1 queries in the aggregation service. Each dashboard widget is making its own DB call instead of batching. Working on a fix.', ts: '11:30' },
    ],
  },
  {
    id: 'ch-general',
    name: 'general',
    description: 'Company-wide announcements and chat',
    messages: [
      { id: 'm14', author: 'u1', text: 'Good morning everyone 👋', ts: '08:59' },
      { id: 'm15', author: 'u3', text: 'Morning! Heads up — we have an active P0 in #frontend. Login is broken for Safari users.', ts: '09:25' },
      { id: 'm16', author: 'u4', text: 'On it.', ts: '09:26' },
      { id: 'm17', author: 'u2', text: 'Also FYI staging is down (OPS-122). Don\'t try to deploy anything there today.', ts: '09:40' },
    ],
  },
  {
    id: 'ch-ops-alerts',
    name: 'ops-alerts',
    description: 'Automated infrastructure alerts',
    messages: [
      { id: 'm18', author: 'u4', text: '[ALERT] Staging deploy pipeline failed at health check — timeout after 30s. OPS-122 opened.', ts: '07:03', linkedTicket: 'OPS-122' },
      { id: 'm19', author: 'u2', text: 'Is the staging DB reachable?', ts: '07:08' },
      { id: 'm20', author: 'u4', text: 'DB is up and responding. The /health endpoint itself is hanging. Investigating.', ts: '07:15' },
    ],
  },
];

export function getChannel(id: string): Channel | undefined {
  return channels.find(c => c.id === id);
}
