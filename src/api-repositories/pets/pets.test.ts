import { getPets } from './pets';
import { petsApiServerMock } from '../../../test-utils/mock-pets-api/pets-api-server.mock.ts';
import { expect } from 'vitest';
import { http, HttpResponse } from 'msw';

describe('getPets', () => {
  beforeAll(() => petsApiServerMock.listen());
  afterEach(() => petsApiServerMock.resetHandlers());
  afterAll(() => petsApiServerMock.close());

  test('returns first page with pets if name is not specified', async () => {
    // ACT
    const pets = await getPets({});

    // ASSERT
    expect(pets).toEqual([
      {
        id: 'ANMA0000032315',
        name: "'Owon",
      },
      {
        id: 'ANMA0000264633',
        name: 'Abalone',
      },
      {
        id: 'ANMA0000262167',
        name: 'Albatross',
      },
      {
        id: 'ANMA0000034899',
        name: 'Aldebaran mud leech',
      },
      {
        id: 'ANMA0000008622',
        name: 'Aldebaran serpent',
      },
      {
        id: 'ANMA0000010045',
        name: 'Aldebaran shellmouth',
      },
      {
        id: 'ANMA0000028270',
        name: 'Algorian mammoth',
      },
      {
        id: 'ANMA0000260398',
        name: 'Alien horse',
      },
      {
        id: 'ANMA0000027729',
        name: 'Alligator',
      },
      {
        id: 'ANMA0000207062',
        name: 'Alopex lagopus',
      },
    ]);
  });

  test('returns pets with specified name', async () => {
    // ACT
    const pets = await getPets({ name: 'Albatross' });

    // ASSERT
    expect(pets).toEqual([
      {
        id: 'ANMA0000262167',
        name: 'Albatross',
      },
    ]);
  });

  test('returns empty array if no pets were found', async () => {
    // ACT
    const pets = await getPets({ name: 'aaa' });

    // ASSERT
    expect(pets).toEqual([]);
  });

  test('returns pets considers limit', async () => {
    // ACT
    const pets = await getPets({ pageSize: 3 });

    // ASSERT
    expect(pets.length).toBe(3);
  });

  test('returns pets considers limit and offset ', async () => {
    // ACT
    const pets = await getPets({ pageSize: 4, pageNumber: 2 });

    // ASSERT
    expect(pets).toEqual([
      {
        id: 'ANMA0000008622',
        name: 'Aldebaran serpent',
      },
      {
        id: 'ANMA0000010045',
        name: 'Aldebaran shellmouth',
      },
      {
        id: 'ANMA0000028270',
        name: 'Algorian mammoth',
      },
      {
        id: 'ANMA0000260398',
        name: 'Alien horse',
      },
    ]);
  });

  test('returns pets considers limit and offset and name', async () => {
    // ACT
    const pets = await getPets({ pageSize: 3, pageNumber: 0, name: 'owon' });

    // ASSERT
    expect(pets).toEqual([
      {
        id: 'ANMA0000032315',
        name: "'Owon",
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
