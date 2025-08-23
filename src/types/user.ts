import type { Country } from './country';

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export interface User {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: Gender;
  isTermsAccepted: boolean;
  picture: string;
  country: Country;
}
