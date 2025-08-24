import { z } from 'zod';
import { Gender } from '../../../types/user.ts';
import { Country } from '../../../types/country.ts';

export type UserFormData = z.infer<typeof UserFormSchema>;

const MAX_IMG_SIZE = 5 * 1024 * 1024;

export const UserFormSchema = z
  .object({
    name: z.string().regex(/^[A-Z][A-Za-z]*$/, { message: 'Must start from uppercase letter' }),
    age: z.number({ message: 'Must be a number' }).nonnegative({ message: 'Must be positive' }),
    email: z.email(),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{4,}$/, {
      message: 'Must contain 0-9, a-z, A-Z one of !@#$%^&*()_+',
    }),
    confirmPassword: z.string().min(1, { message: 'Please confirm password' }),
    gender: z.enum([Gender.Male, Gender.Female], { message: 'Gender must be selected' }),
    termsAndConditions: z
      .boolean()
      .refine((value) => value === true, { message: 'Please accept terms and conditions' }),
    picture: z
      .instanceof(FileList, { message: 'Please add a picture' })
      .refine((fileList) => (fileList.item(0)?.size || 0) <= MAX_IMG_SIZE, {
        message: 'Max size is 5 Mb',
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
          message: 'Please upload an image in .jpg or .png format',
        }
      ),
    country: z.enum(Country, { message: 'Country must be selected from the list' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Must be the same as a password',
    path: ['confirmPassword'],
    when(payload) {
      return UserFormSchema.pick({ password: true, confirmPassword: true }).safeParse(payload.value).success;
    },
  });
