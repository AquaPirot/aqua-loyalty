import { create } from 'zustand';

interface UserState {
  points: number;
  setPoints: (points: number) => void;
  addPoints: (points: number) => void;
  subtractPoints: (points: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  points: 0,
  setPoints: (points) => set({ points }),
  addPoints: (points) => set((state) => ({ points: state.points + points })),
  subtractPoints: (points) => set((state) => ({ points: state.points - points })),
}));
