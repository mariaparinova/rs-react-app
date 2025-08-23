import { User } from '../../types/user.ts';

export enum FormType {
  Uncontrolled = 'uncontrolled',
  Controlled = 'controlled',
}

export interface UserStore {
  userByUncontrolledForm: User | undefined;
  userByControlledForm: User | undefined;
  setUser: (props: { user: User; formType: FormType }) => void;
}
