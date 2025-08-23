import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserFormData, UserFormSchema } from './userFormSchema.ts';
import { useUserStore } from '../../../../store/user/userStore.ts';
import { Gender, User } from '../../../../types/user.ts';
import { Button, ButtonStyle, ButtonType } from '../../../Button/Button.tsx';
import { FormField } from './FormField/FormField.tsx';
import { FormFieldCheckbox } from './FormFieldCheckbox/FormFieldCheckbox.tsx';
import { FormFieldDatalist } from './FormFieldDatalist/FormFieldDatalist.tsx';
import { FormFieldSelect } from './FormFieldSelect/FormFieldSelect.tsx';
import { useCountriesStore } from '../../../../store/countries/countries.ts';
import { FormFieldFile } from './FormFieldFile/FormFieldFile.tsx';
import { FormType } from '../../../../store/user/userStore.types.ts';
import { imgToBase64 } from '../../../../utils/imgToBase64.ts';
import { Country } from '../../../../types/country.ts';

function getInitFormData(params: { user?: User }) {
  const { user } = params;

  return {
    name: user?.name || '',
    age: user?.age,
    email: user?.email || '',
    password: user?.password || '',
    confirmPassword: user?.password || '',
    gender: user?.gender,
    country: (user?.country as Country) || '',
  };
}

export function ControlledUserForm() {
  const { userByControlledForm, setUser } = useUserStore();
  const { countries } = useCountriesStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: getInitFormData({ user: userByControlledForm }),
    mode: 'all',
  });

  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    let picInBase64: string | undefined;

    try {
      picInBase64 = await imgToBase64(data.picture.item(0)!);
    } catch {
      alert('Can not convert image to base64. Try to upload another one, please');
      return;
    }

    const user = {
      name: data.name,
      age: data.age,
      email: data.email,
      password: data.password,
      gender: data.gender,
      country: data.country,
      isTermsAccepted: data.termsAndConditions,
      picture: picInBase64,
    };

    setUser({ user, formType: FormType.Controlled });
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <FormField id="user-name" label="Name" {...register('name')} errors={errors} />
      <FormField
        id="user-age"
        label="Age"
        {...register('age', { valueAsNumber: true })}
        errors={errors}
        isNumber={true}
      />
      <FormField id="user-email" label="Email" {...register('email')} errors={errors} />
      <FormField id="user-password" label="Password" {...register('password')} errors={errors} />
      <FormField id="psw-confirmation" label="Confirm password" {...register('confirmPassword')} errors={errors} />
      <FormFieldSelect
        id="gender"
        label="Gender"
        values={[Gender.Male, Gender.Female]}
        {...register('gender')}
        errors={errors}
      />
      <FormFieldDatalist
        id="country"
        label="Country"
        values={[...countries]}
        {...register('country')}
        errors={errors}
      />
      <FormFieldCheckbox
        id={'t&c'}
        label={'Terms and conditions'}
        {...register('termsAndConditions')}
        errors={errors}
      />
      <FormFieldFile id="pic" label="Upload file" {...register('picture')} errors={errors} />
      <Button
        className="submit"
        style={ButtonStyle.Primary}
        type={ButtonType.Submit}
        isDisabled={Object.keys(errors).length > 0}
      >
        Submit
      </Button>
    </form>
  );
}
