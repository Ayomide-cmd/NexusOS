 NexusOS v1

A simulated company workspace for incident investigation. Users navigate between four interconnected apps — Forge, Pulse, Courier, and Atlas — to trace a real bug from ticket to root cause.

Built with Next.js 15, TypeScript, Tailwind CSS, and Zustand.

---

## The Scenario

A critical bug has been reported: **Safari users cannot log in**.

The cause is scattered across four apps. Your job is to connect the dots:

```
Forge (ENG-244) → Pulse (#frontend) → Courier (Acme email) → Atlas (OAuth page)
```

The **Investigation Agent** panel on the right tracks your progress and reveals the root cause once all four steps are visited.

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open in browser
http://localhost:3000
```

Other commands:

```bash
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Folder Structure

```
nexusos/
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── dashboard/              # Overview — stats, incidents, activity feed
│   │   ├── forge/                  # Ticket tracker (Jira analog)
│   │   │   └── [id]/               # Individual ticket detail
│   │   ├── pulse/                  # Team messaging (Slack analog)
│   │   │   └── [id]/               # Individual channel view
│   │   ├── courier/                # Email client (Gmail analog)
│   │   │   ├── inbox/              # Inbox list view
│   │   │   └── [id]/               # Individual email + list
│   │   ├── atlas/                  # Documentation wiki (Notion analog)
│   │   │   └── [id]/               # Individual wiki page
│   │   ├── settings/               # Account settings
│   │   ├── layout.tsx              # Root layout: sidebar + agent panel + ⌘K
│   │   └── globals.css             # Base styles + scrollbar overrides
│   │
│   ├── components/
│   │   ├── ui/                     # Primitive UI components
│   │   │   ├── Avatar.tsx          # User avatar with color coding
│   │   │   ├── Badge.tsx           # Priority + status badges
│   │   │   ├── Button.tsx          # primary / secondary / ghost variants
│   │   │   ├── Card.tsx            # Surface card wrapper
│   │   │   ├── CommandPalette.tsx  # ⌘K fuzzy search across all apps
│   │   │   ├── LinkChip.tsx        # Cross-app navigation chip
│   │   │   ├── SearchInput.tsx     # Search field with icon
│   │   │   └── Tabs.tsx            # Tab switcher
│   │   ├── layouts/
│   │   │   └── Sidebar.tsx         # Left nav: app links, incident alert, user row
│   │   └── agent/
│   │       └── AgentPanel.tsx      # Right sidebar: investigation trail + conclusion
│   │
│   ├── data/                       # Static data — no backend required
│   │   ├── users.ts                # 5 team members with roles and avatar colors
│   │   ├── tickets.ts              # ENG-244, ENG-231, ENG-220, OPS-122
│   │   ├── messages.ts             # 4 channels with full message threads
│   │   ├── emails.ts               # 4 emails including the Acme support report
│   │   └── docs.ts                 # 4 wiki pages including OAuth Authentication
│   │
│   └── lib/
│       ├── store/
│       │   └── investigation.ts    # Zustand store — tracks visited trail steps
│       └── constants/
│           └── index.ts            # Nav config, priority/status label maps
```

---

## Apps

### Dashboard
The home screen. Shows:
- Critical incident count, unread messages, pending tickets, new emails
- Active incident list with severity indicators
- Recent activity feed with deep links into each app
- Quick-access cards for the investigation trail

### Forge
Ticket tracking system. Contains 4 tickets:

| ID       | Title                      | Priority | Status      |
|----------|----------------------------|----------|-------------|
| ENG-244  | Safari Login Failure       | Critical | Critical    |
| ENG-231  | Dashboard Load Time > 4s   | High     | In Progress |
| ENG-220  | Export CSV Missing Columns | Medium   | Open        |
| OPS-122  | Staging Deployment Failing | High     | Open        |

ENG-244 links to the `#frontend` Pulse channel and the OAuth Authentication Atlas page.

### Pulse
Team messaging with 4 channels:

| Channel       | Purpose                        |
|---------------|--------------------------------|
| #frontend     | The Safari incident thread     |
| #performance  | Dashboard load time discussion |
| #general      | Company-wide chat              |
| #ops-alerts   | Automated infra alerts         |

The `#frontend` thread contains the key diagnostic message linking to the Atlas OAuth page.

### Courier
Email inbox with 4 messages:

| From              | Subject                               |
|-------------------|---------------------------------------|
| Acme Corp Support | URGENT: Multiple Users Cannot Log In  |
| PagerDuty         | Staging CI/CD Pipeline Timeout        |
| GitHub            | PR #891 — Fix auth cookie SameSite    |
| NexusOS Digest    | Weekly Engineering Digest             |

The Acme support email links back to ENG-244.

### Atlas
Documentation wiki with 4 pages:

| Page                  | Category    |
|-----------------------|-------------|
| OAuth Authentication  | Engineering |
| Deployment Runbook    | Operations  |
| Incident Response     | Operations  |
| Frontend Standards    | Engineering |

The **OAuth Authentication** page contains the root cause — the exact cookie config required for Safari cross-origin auth, with a warning callout explaining the SameSite=None + secure=true requirement.

---

## Investigation Agent

The right sidebar tracks progress through the incident investigation:

| Step | Action                          | Trigger              |
|------|---------------------------------|----------------------|
| 1    | Open Ticket ENG-244             | Visit `/forge/ENG-244` |
| 2    | Read #frontend thread           | Visit `/pulse/ch-frontend` |
| 3    | Check Courier inbox             | Visit `/courier/e1`  |
| 4    | Read OAuth Authentication page  | Visit `/atlas/w-oauth` |

Once all four steps are complete, the conclusion panel reveals:

> Auth cookie missing `sameSite="None"` and `secure=true` — required for cross-origin cookies in Safari. Fix is in PR #891.

A progress bar fills as you advance through the trail.

---

## Cross-App Links

Every app links to related content in other apps. Nothing is siloed.

- **ENG-244** → `#frontend` channel (Pulse) + OAuth Authentication (Atlas)
- **#frontend message** → OAuth Authentication (Atlas) + ENG-244 (Forge)
- **Acme email** → ENG-244 (Forge)
- **GitHub PR email** → ENG-244 (Forge)
- **OPS-122** → Deployment Runbook (Atlas)
- **#ops-alerts** → OPS-122 (Forge)

---

## Command Palette

Press `⌘K` (Mac) or `Ctrl+K` (Windows/Linux) from anywhere to open the command palette. It fuzzy-searches across:
- All Forge tickets
- All Pulse channels
- All Courier emails
- All Atlas pages

Arrow keys to navigate, Enter to jump, Escape to close.

---

## Tech Stack

| Layer          | Technology              |
|----------------|-------------------------|
| Framework      | Next.js 16 (App Router) |
| Language       | TypeScript              |
| Styling        | Tailwind CSS v4         |
| State          | Zustand                 |
| Icons          | Lucide React            |
| Data           | Static TypeScript files |

No backend. No database. No authentication. All data lives in `src/data/`.

---

## Design

Inspired by Linear, Vercel, and Notion. Dark slate palette with a single blue accent.

| Token          | Value     | Usage                    |
|----------------|-----------|--------------------------|
| Background     | `#0C1016` | App shell                |
| Surface        | `#111720` | Sidebar, topbar, panels  |
| Surface-2      | `#161D28` | Cards, list rows         |
| Surface-3      | `#1C2535` | Hover states, inputs     |
| Border         | `#1E2D42` | All dividers             |
| Text           | `#D4DDE8` | Primary content          |
| Text muted     | `#8899AA` | Secondary content        |
| Text dim       | `#4E6580` | Labels, timestamps       |
| Accent         | `#3B82F6` | Active states, links     |
| Red            | `#EF4444` | Critical, errors         |
| Amber          | `#F59E0B` | High priority, warnings  |
| Green          | `#10B981` | Done, success, agent dot |

---

## Extending NexusOS

**Add a new ticket**
Edit `src/data/tickets.ts` and add an object to the `tickets` array.

**Add a new wiki page**
Edit `src/data/docs.ts`. Supported block types: `paragraph`, `heading`, `code`, `callout`, `list`.

**Add a new channel**
Edit `src/data/messages.ts` and add to the `channels` array. The channel will appear automatically in the Pulse sidebar.

**Add a new email**
Edit `src/data/emails.ts`. Set `read: false` to show the unread indicator.

**Extend the investigation trail**
Edit `src/lib/store/investigation.ts` to add new `TrailStep` types, and update `AgentPanel.tsx` with the new steps.

---

## License

MIT
