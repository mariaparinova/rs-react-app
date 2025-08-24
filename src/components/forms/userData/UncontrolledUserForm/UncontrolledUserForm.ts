import { User } from '../../../../types/user.ts';
import { InitUserFormData } from '../userFormSchema.ts';

export interface UncontrolledUserFormProps {
  initFormData: InitUserFormData | undefined;
  submitHandler: (params: { user: User }) => void;
}
