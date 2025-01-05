import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  token: string | null;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  login: (userData, token) =>
    set((state) => ({
      isAuthenticated: true,
      user: userData,
      token,
    })),
  logout: () =>
    set((state) => ({
      isAuthenticated: false,
      user: null,
      token: null,
    })),
}));

export default useAuthStore;
