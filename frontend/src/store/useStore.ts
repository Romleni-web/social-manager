import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  plan: string;
  role: string;
  creditsRemaining: number;
}

interface AppState {
  user: User | null;
  token: string | null;
  activeWorkspaceId: string | null;
  isComposerOpen: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  setActiveWorkspace: (id: string) => void;
  toggleComposer: (open: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      activeWorkspaceId: null,
      isComposerOpen: false,
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null, activeWorkspaceId: null, isComposerOpen: false }),
      setActiveWorkspace: (id) => set({ activeWorkspaceId: id }),
      toggleComposer: (open) => set({ isComposerOpen: open }),
    }),
    {
      name: 'social-ai-storage',
    }
  )
);
