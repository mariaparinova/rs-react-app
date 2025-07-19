import { http, HttpResponse } from 'msw';
import { pets } from './data-animals.ts';
import { GetPetsBody, PetDto } from '../../src/api-repositories/pets/pets.types.ts';
const DEFAULT_LIMIT = 10;

export const handlers = [
  http.post('https://stapi.co/api/v1/rest/animal/search', async ({ request }) => {
    const bodyText = await request.text();
    const params = new URLSearchParams(bodyText);
    const name = params.get('name');
    const searchParams = new URL(request.url).searchParams;
    const pageNumberStr = searchParams.get('pageNumber');
    const pageSizeStr = searchParams.get('pageSize');
    let petsResult: PetDto[] = pets.slice();
    const pageSize = pageSizeStr ? +pageSizeStr : DEFAULT_LIMIT;
    const pageNumber = pageNumberStr ? +pageNumberStr : 0;

    if (name) {
      const lowerCasedName = name.toLowerCase();
      petsResult = petsResult.filter((pet) => pet.name.toLowerCase().includes(lowerCasedName));
    }

    const start = pageNumber * pageSize;
    const end = start + pageSize;

    const responseBody: Pick<GetPetsBody, 'animals'> = {
      animals: petsResult.slice(start, end),
    };

    return HttpResponse.json(responseBody);
  }),
];
