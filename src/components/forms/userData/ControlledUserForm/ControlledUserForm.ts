import { User } from '../../../../types/user.ts';
import { InitUserFormData } from '../userFormSchema.ts';

export interface ControlledUserFormProps {
  initFormData: InitUserFormData | undefined;
  submitHandler: (params: { user: User }) => void;
}
