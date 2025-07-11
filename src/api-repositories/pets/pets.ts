import { GetPetsBody, GetPetsParams } from './pets.types.ts';
import { convertPetDtoToPet } from '../../services/petService.ts';
import { Pet } from '../../types/pet.ts';

const BASE_URL = 'https://stapi.co/api';
const AMOUNT_OF_ITEMS_PER_PAGE = 10;

export const getPets = async (params: GetPetsParams): Promise<Pet[]> => {
  const { name, offset = 0, limit = AMOUNT_OF_ITEMS_PER_PAGE } = params;
  const url = `${BASE_URL}/v1/rest/animal/search`;
  const queryParams = new URLSearchParams();

  if (offset) {
    queryParams.append('pageNumber', `${offset}`);
  }

  if (limit) {
    queryParams.append('pageSize', `${limit}`);
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
  const responseBody: GetPetsBody = await response.json();

  return responseBody.animals.map((petDto) => convertPetDtoToPet(petDto));
};
