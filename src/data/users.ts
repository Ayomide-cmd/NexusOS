export type User = {
  id: string;
  name: string;
  initials: string;
  role: string;
  email: string;
  color: string;
  status: 'online' | 'away' | 'offline';
};

export const users: User[] = [
  { id: 'u1', name: 'Sarah Chen',   initials: 'SC', role: 'Frontend Lead',     email: 'sarah@nexusos.io',   color: '#6366F1', status: 'online'  },
  { id: 'u2', name: 'Marcus Webb',  initials: 'MW', role: 'Backend Engineer',   email: 'marcus@nexusos.io',  color: '#10B981', status: 'online'  },
  { id: 'u3', name: 'Daniel Park',  initials: 'DP', role: 'Auth Engineer',      email: 'daniel@nexusos.io',  color: '#F59E0B', status: 'away'    },
  { id: 'u4', name: 'Lena Ross',    initials: 'LR', role: 'DevOps',             email: 'lena@nexusos.io',    color: '#EC4899', status: 'online'  },
  { id: 'u5', name: 'Alex Kim',     initials: 'AK', role: 'QA Engineer',        email: 'alex@nexusos.io',    color: '#8B5CF6', status: 'online'  },
];

export const ME = users[4]; // logged-in user

export function getUser(id: string): User | undefined {
  return users.find(u => u.id === id);
}
