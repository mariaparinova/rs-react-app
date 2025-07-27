import { getPets } from './pets';
import { petsApiServerMock } from '../../../test-utils/mock-pets-api/pets-api-server.mock.ts';
import { expect, describe, beforeAll, afterEach, afterAll, test } from 'vitest';
import { http, HttpResponse } from 'msw';

describe('getPets', () => {
  beforeAll(() => petsApiServerMock.listen());
  afterEach(() => petsApiServerMock.resetHandlers());
  afterAll(() => petsApiServerMock.close());

  test('returns first page with pets if name is not specified', async () => {
    // ACT
    const response = await getPets({});

    // ASSERT
    expect(response.pets).toEqual([
      {
        id: 'ANMA0000032315',
        name: "'Owon",
        types: {
          animal: false,
          insect: false,
          bird: false,
          dog: false,
          cat: false,
        },
      },
      {
        id: 'ANMA0000264633',
        name: 'Abalone',
        types: {
          animal: true,
          insect: false,
          bird: false,
          dog: false,
          cat: false,
        },
      },
      {
        id: 'ANMA0000262167',
        name: 'Albatross',
        types: {
          animal: true,
          insect: false,
          bird: false,
          dog: false,
          cat: false,
        },
      },
      {
        id: 'ANMA0000034899',
        name: 'Aldebaran mud leech',
        types: {
          animal: false,
          insect: false,
          bird: false,
          dog: false,
          cat: false,
        },
      },
      {
        id: 'ANMA0000008622',
        name: 'Aldebaran serpent',
        types: {
          animal: false,
          insect: false,
          bird: false,
          dog: false,
          cat: false,
        },
      },
      {
        id: 'ANMA0000010045',
        name: 'Aldebaran shellmouth',
        types: {
          animal: false,
          insect: false,
          bird: false,
          dog: false,
          cat: false,
        },
      },
      {
        id: 'ANMA0000028270',
        name: 'Algorian mammoth',
        types: {
          animal: false,
          insect: false,
          bird: false,
          dog: false,
          cat: false,
        },
      },
      {
        id: 'ANMA0000260398',
        name: 'Alien horse',
        types: {
          animal: false,
          insect: false,
          bird: false,
          dog: false,
          cat: false,
        },
      },
      {
        id: 'ANMA0000027729',
        name: 'Alligator',
        types: {
          animal: true,
          insect: false,
          bird: false,
          dog: false,
          cat: false,
        },
      },
      {
        id: 'ANMA0000207062',
        name: 'Alopex lagopus',
        types: {
          animal: true,
          insect: false,
          bird: false,
          dog: false,
          cat: false,
        },
      },
    ]);
  });

  test('returns pets with specified name', async () => {
    // ACT
    const response = await getPets({ name: 'Albatross' });

    // ASSERT
    expect(response.pets).toEqual([
      {
        id: 'ANMA0000262167',
        name: 'Albatross',
        types: {
          animal: true,
          insect: false,
          bird: false,
          dog: false,
          cat: false,
        },
      },
    ]);
  });

  test('returns empty array if no pets were found', async () => {
    // ACT
    const response = await getPets({ name: 'aaa' });

    // ASSERT
    expect(response.pets).toEqual([]);
  });

  test('returns pets considers limit', async () => {
    // ACT
    const response = await getPets({ pageSize: 3 });

    // ASSERT
    expect(response.pets.length).toBe(3);
  });

  test('returns pets considers limit and offset ', async () => {
    // ACT
    const response = await getPets({ pageSize: 4, pageNumber: 2 });

    // ASSERT
    expect(response.pets).toEqual([
      {
        id: 'ANMA0000008622',
        name: 'Aldebaran serpent',
        types: {
          animal: false,
          insect: false,
          bird: false,
          dog: false,
          cat: false,
        },
      },
      {
        id: 'ANMA0000010045',
        name: 'Aldebaran shellmouth',
        types: {
          animal: false,
          insect: false,
          bird: false,
          dog: false,
          cat: false,
        },
      },
      {
        id: 'ANMA0000028270',
        name: 'Algorian mammoth',
        types: {
          animal: false,
          insect: false,
          bird: false,
          dog: false,
          cat: false,
        },
      },
      {
        id: 'ANMA0000260398',
        name: 'Alien horse',
        types: {
          animal: false,
          insect: false,
          bird: false,
          dog: false,
          cat: false,
        },
      },
    ]);
  });

  test('returns pets considers limit and offset and name', async () => {
    // ACT
    const response = await getPets({ pageSize: 3, pageNumber: 0, name: 'owon' });

    // ASSERT
    expect(response.pets).toEqual([
      {
        id: 'ANMA0000032315',
        name: "'Owon",
        types: {
          animal: false,
          insect: false,
          bird: false,
          dog: false,
          cat: false,
        },
      },
    ]);
  });

  test('checks throwing an error when API responds with non 200 code', async () => {
    // ARRANGE
    petsApiServerMock.use(
      http.post('https://stapi.co/api/v1/rest/animal/search', () => {
        return new HttpResponse(null, { status: 400 });
      })
    );

    //ASSERT
    await expect(getPets({})).rejects.toThrow('Error during fetching pets');
  });
});
