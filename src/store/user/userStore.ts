import { UserStore } from './userStore.types.ts';
import { create } from 'zustand';

export const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  setUser: (props) => {
    set({ user: props.user });
  },
}));
