import { User } from '../../types/user.ts';

export interface UserStore {
  user: User | undefined;
  setUser: (props: { user: User }) => void;
}
