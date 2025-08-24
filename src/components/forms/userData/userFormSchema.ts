import { z } from 'zod';
import { Gender } from '../../../types/user.ts';
import { Country } from '../../../types/country.ts';
import {
  MAST_START_FROM_UPPERCASE,
  MAX_SIZE_5MB,
  MUST_ACCEPT_TERMS,
  MUST_ADD_PICTURE,
  MUST_BE_JPG_OR_PNG,
  MUST_BE_NUMBER,
  MUST_BE_POSITIVE,
  MUST_CONFIRM_PASSWORD,
  MUST_CONTAIN_CHARACTERS,
  MUST_SELECT_COUNTRY,
  MUST_SELECT_GENDER,
  PASSWORDS_MUST_MATCH,
} from '../../../constants/validation-messages.ts';

export type UserFormData = z.infer<typeof UserFormSchema>;

export type InitUserFormData = Pick<
  UserFormData,
  'name' | 'age' | 'email' | 'password' | 'confirmPassword' | 'gender' | 'country'
>;

const MAX_IMG_SIZE = 5 * 1024 * 1024;

export const UserFormSchema = z
  .object({
    name: z.string().regex(/^[A-Z][A-Za-z]*$/, { message: MAST_START_FROM_UPPERCASE }),
    age: z.number({ message: MUST_BE_NUMBER }).nonnegative({ message: MUST_BE_POSITIVE }),
    email: z.email(),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{4,}$/, {
      message: MUST_CONTAIN_CHARACTERS,
    }),
    confirmPassword: z.string().min(1, { message: MUST_CONFIRM_PASSWORD }),
    gender: z.enum([Gender.Male, Gender.Female], { message: MUST_SELECT_GENDER }),
    termsAndConditions: z.boolean().refine((value) => value === true, { message: MUST_ACCEPT_TERMS }),
    picture: z
      .instanceof(FileList, { message: MUST_ADD_PICTURE })
      .refine((fileList) => (fileList.item(0)?.size || 0) <= MAX_IMG_SIZE, {
        message: MAX_SIZE_5MB,
      })
      .refine(
        (fileList) => {
          const fileType = fileList.item(0)?.type;

          if (typeof fileType !== 'string') {
            return false;
          }

          return ['image/jpeg', 'image/png'].includes(fileType);
        },
        {
          message: MUST_BE_JPG_OR_PNG,
        }
      ),
    country: z.enum(Country, { message: MUST_SELECT_COUNTRY }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: PASSWORDS_MUST_MATCH,
    path: ['confirmPassword'],
    when(payload) {
      return UserFormSchema.pick({ password: true, confirmPassword: true }).safeParse(payload.value).success;
    },
  });
