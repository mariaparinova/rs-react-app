import { FormEventHandler, useRef, useState } from 'react';
import { FormField } from '../../formFields/FormField/FormField.tsx';
import { InputTyp } from '../../formFields/FormField/FormField.ts';
import { Gender, User } from '../../../../types/user.ts';
import { Button, ButtonStyle, ButtonType } from '../../../Button/Button.tsx';
import { useCountriesStore } from '../../../../store/countries/countries.ts';
import { FormFieldSelect } from '../../formFields/FormFieldSelect/FormFieldSelect.tsx';
import { FormFieldDatalist } from '../../formFields/FormFieldDatalist/FormFieldDatalist.tsx';
import { FormFieldCheckbox } from '../../formFields/FormFieldCheckbox/FormFieldCheckbox.tsx';
import { FormFieldFile } from '../../formFields/FormFieldFile/FormFieldFile.tsx';
import { UserFormSchema } from '../userFormSchema.ts';
import { imgToBase64 } from '../../../../utils/imgToBase64.ts';
import { UncontrolledUserFormProps } from './UncontrolledUserForm.ts';

export function UncontrolledUserForm(props: UncontrolledUserFormProps) {
  const { submitHandler, initFormData } = props;
  const [errors, setErrors] = useState<Record<string, { message?: string }>>({});
  const { countries } = useCountriesStore();
  const picRef = useRef<HTMLInputElement>(null);
  const [isFormSuccess, setIsFormSuccess] = useState(false);

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.currentTarget));
    const formDataForUserFormSchema = {
      name: formData.name,
      age: formData.age ? +formData.age : undefined,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      gender: formData.gender,
      country: formData.country,
      termsAndConditions: formData.termsAndConditions === 'on',
      picture: picRef.current?.files,
    };

    const userFormSchemaParsed = UserFormSchema.safeParse(formDataForUserFormSchema);
    const transformedErrors: Record<string, { message?: string }> = {};

    if (!userFormSchemaParsed.success) {
      userFormSchemaParsed.error.issues.forEach((errorItem) => {
        const key = errorItem?.path[0] as keyof typeof formDataForUserFormSchema;
        if (key) {
          transformedErrors[key] = { message: errorItem.message };
        }
      });

      setErrors(transformedErrors);
      return;
    }

    const file = picRef.current?.files?.[0];
    let picInBase64: string | undefined;

    if (!file) {
      alert('Please upload file');
      return;
    }

    try {
      picInBase64 = await imgToBase64(file);
    } catch {
      alert('Can not convert image to base64. Try to upload another one, please');
      return;
    }

    const user = {
      name: formData.name,
      age: +formData.age,
      email: formData.email,
      password: formData.password,
      gender: formData.gender,
      isTermsAccepted: formData.termsAndConditions === 'on',
      picture: picInBase64,
      country: formData.country,
    };

    setIsFormSuccess(true);
    submitHandler({ user: user as User });
  };

  return (
    <form className="form" onSubmit={onSubmitHandler}>
      <FormField id="user-name" name="name" label="Name" defaultValue={initFormData?.name} errors={errors} />
      <FormField
        id="user-age"
        name="age"
        label="Age"
        defaultValue={initFormData?.age ? `${initFormData.age}` : ''}
        errors={errors}
      />
      <FormField id="user-email" name="email" label="Email" defaultValue={initFormData?.email} errors={errors} />
      <FormField
        id="user-password"
        inputType={InputTyp.Password}
        name="password"
        label="Password"
        defaultValue={initFormData?.password}
        errors={errors}
      />
      <FormField
        id="psw-confirmation"
        inputType={InputTyp.Password}
        name="confirmPassword"
        label="Confirm password"
        defaultValue={initFormData?.password}
        errors={errors}
      />
      <FormFieldSelect
        id="gender"
        label="Gender"
        name="gender"
        selectedValue={initFormData?.gender}
        values={[Gender.Male, Gender.Female]}
        errors={errors}
      />
      <FormFieldDatalist
        id="country"
        name="country"
        label="Country"
        selectedValue={initFormData?.country}
        values={[...countries]}
        errors={errors}
      />
      <FormFieldCheckbox id={'t&c'} name={'termsAndConditions'} label={'Terms and conditions'} errors={errors} />
      <FormFieldFile id="pic" name="picture" label="Upload file" errors={errors} ref={picRef} />
      <Button className="submit last-focusable" style={ButtonStyle.Primary} type={ButtonType.Submit}>
        Submit
      </Button>
      <div className="success">{isFormSuccess && 'Form is successfully submitted'}</div>
    </form>
  );
}
