import { test, describe, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { DetailedPetPage } from './DetailedPetPage.tsx';
import { Pet } from '../../types/pet.ts';
import { Suspense } from 'react';

function renderComponent() {
  const pet: Pet = {
    id: '123',
    name: 'owon',
    types: {
      animal: true,
      insect: false,
      bird: false,
      dog: false,
      cat: true,
    },
  };

  const routes = [
    {
      path: '/',
      element: <DetailedPetPage />,
      loader: async (): Promise<Pet> => pet,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
    hydrationData: { loaderData: { '0': pet } },
  });

  render(
    <Suspense fallback={<div>Загрузка...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

describe('<DetailedPet>', () => {
  describe('pet data', () => {
    test('checks pet name', async () => {
      // ACT
      renderComponent();

      // ASSERT
      await waitFor(() => {
        expect(screen.getByText(/owon/i)).toBeInTheDocument();
      });
    });

    test('checks pet type', async () => {
      // ACT
      renderComponent();

      // ASSERT
      await waitFor(() => {
        expect(screen.getByText(/animal cat/i)).toBeInTheDocument();
      });
    });

    test('checks pet id', async () => {
      // ACT
      renderComponent();

      // ASSERT

      await waitFor(() => {
        expect(screen.getByText(/123/i)).toBeInTheDocument();
      });
    });
  });

  test('checks link to go to Main page', async () => {
    // ACT
    renderComponent();

    // ASSERT
    await waitFor(() => {
      const detailedPet = screen.getByTestId('detailed-pet');
      const linkToMainPage = detailedPet.querySelector('a');
      expect(linkToMainPage).toBeInTheDocument();
    });
  });

  test('checks detailed info is closet after clicking element to close', async () => {});

  test('checks content when pet was not found', async () => {});
});
