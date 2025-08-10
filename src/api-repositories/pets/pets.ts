import { GetPetsBody, GetPetsParams, GetPetsResult, PetDto } from './pets.types.ts';
import { convertPetDtoToPet } from '../../services/petService.ts';
import { Pet } from '../../types/pet.ts';

const BASE_URL = 'https://stapi.co/api';

export const getPets = async (params: GetPetsParams): Promise<GetPetsResult> => {
  const { name, pageNumber, pageSize } = params;
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

  return {
    totalPages: responseBody.page.totalPages,
    pets: responseBody.animals.map((petDto) => convertPetDtoToPet(petDto)),
  };
};

export const getPetById = async (params: { id: string }): Promise<Pet> => {
  const { id } = params;
  const url = `${BASE_URL}/v1/rest/animal`;
  const queryParams = new URLSearchParams();
  queryParams.set('uid', id);

  const response = await fetch(`${url}?${queryParams}`);

  if (response.status !== 200) {
    throw new Error('Error during fetching pet by id');
  }

  const responseBody: Record<'animal', PetDto> = await response.json();
  const animal = responseBody.animal;

  return convertPetDtoToPet(animal);
};
