import { GetPetsBody, GetPetsParams } from './pets.types.ts';
import { convertPetDtoToPet } from '../../services/petService.ts';
import { Pet } from '../../types/pet.ts';

const BASE_URL = 'https://stapi.co/api';
const AMOUNT_OF_ITEMS_PER_PAGE = 10;

export const getPets = async (params: GetPetsParams): Promise<Pet[]> => {
  const { name, pageNumber = 1, pageSize = AMOUNT_OF_ITEMS_PER_PAGE } = params;
  const url = `${BASE_URL}/v1/rest/animal/search`;
  const queryParams = new URLSearchParams();

  if (pageNumber) {
    queryParams.append('pageNumber', `${pageNumber - 1}`);
  }

  if (pageSize) {
    queryParams.append('pageSize', `${pageSize}`);
  }

  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
  };

  if (name) {
    options.body = new URLSearchParams({ name }).toString();
  }

  const response = await fetch(`${url}?${queryParams}`, options);

  if (response.status !== 200) {
    throw new Error('Error during fetching pets');
  }

  const responseBody: GetPetsBody = await response.json();

  return responseBody.animals.map((petDto) => convertPetDtoToPet(petDto));
};
