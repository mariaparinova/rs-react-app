import { UserStore } from './userStore.types.ts';
import { create } from 'zustand';

export const useUserStore = create<UserStore>((set) => ({
  userByUncontrolledForm: undefined,
  userByControlledForm: undefined,
  setUser: (props) => {
    const { user, formType } = props;

    if (formType === 'uncontrolled') {
      set({ userByUncontrolledForm: user });
    }

    if (formType === 'controlled') {
      set({ userByControlledForm: user });
    }
  },
}));
