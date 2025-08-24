import { create } from 'zustand';
import type { CountriesStore } from './countries.types';
import { Country } from '../../types/country.ts';

export const useCountriesStore = create<CountriesStore>(() => ({
  countries: [
    Country.Belarus,
    Country.Poland,
    Country.Ukraine,
    Country.UnitedStates,
    Country.Uzbekistan,
    Country.Kazakhstan,
    Country.Turkey,
    Country.Slovakia,
    Country.CzechRepublic,
    Country.Hungary,
    Country.Romania,
    Country.Slovenia,
    Country.Estonia,
    Country.Latvia,
    Country.Canada,
    Country.Germany,
    Country.France,
    Country.Spain,
    Country.Italy,
    Country.UnitedKingdom,
    Country.Australia,
    Country.Brazil,
    Country.Japan,
    Country.China,
    Country.India,
  ],
}));
