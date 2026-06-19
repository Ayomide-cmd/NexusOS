'use client';
import './globals.css';
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layouts/Sidebar';
import { AgentPanel } from '@/components/agent/AgentPanel';
import { CommandPalette } from '@/components/ui/CommandPalette';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(v => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <html lang="en">
      <body>
        {cmdOpen && <CommandPalette onClose={() => setCmdOpen(false)} />}
        <div className="flex h-screen overflow-hidden bg-[#0C1016]">
          <Sidebar onCmdK={() => setCmdOpen(true)} />
          <main className="flex-1 flex flex-col overflow-hidden min-w-0">
            {children}
          </main>
          <AgentPanel />
        </div>
      </body>
    </html>
  );
}
