'use client';
import { create } from 'zustand';

export type TrailStep = 'ticket' | 'slack' | 'email' | 'wiki';

interface InvestigationStore {
  visited: Set<TrailStep>;
  markVisited: (step: TrailStep) => void;
  isComplete: () => boolean;
}

export const useInvestigation = create<InvestigationStore>((set, get) => ({
  visited: new Set(),
  markVisited: (step) =>
    set((state) => ({ visited: new Set([...state.visited, step]) })),
  isComplete: () => {
    const { visited } = get();
    return (['ticket', 'slack', 'email', 'wiki'] as TrailStep[]).every((s) =>
      visited.has(s)
    );
  },
}));
