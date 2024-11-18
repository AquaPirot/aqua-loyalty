// src/lib/store.ts
import { create } from 'zustand';

interface LoyaltyStore {
  points: number;
  setPoints: (points: number) => void;
  addPoints: (points: number) => void;
}

export const useLoyaltyStore = create<LoyaltyStore>((set) => ({
  points: 0,
  setPoints: (points) => set({ points }),
  addPoints: (points) => set((state) => ({ points: state.points + points })),
}));
