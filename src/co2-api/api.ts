import type { CountriesDatasetDto } from './api.types.ts';

export async function getEmissionsByCountries(): Promise<CountriesDatasetDto> {
  const response = await fetch('/CO2EmissionsByCountries.json');
  return await response.json();
}
