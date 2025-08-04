import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';
import { SelectedItemsManager } from './SelectedItemsManager.tsx';
import type { MainPageStore } from '../../../store/MainPageStore/MainPageStore.types';
import { createStore } from '../../../test-utils/mock-mainPageStore.ts';

const useCatalogStore = createStore<MainPageStore>((set) => ({
  selectedPets: {},
  setSelectedPets: () => set({}),
  clearSelectedPets: () => set({ selectedPets: {} }),
}));

describe('<SelectedItemsManager>', () => {
  beforeEach(() => {
    useCatalogStore.setState({
      selectedPets: {
        ANMA0000027729: {
          id: 'ANMA0000027729',
          name: 'Alligator',
          types: { animal: true, insect: false, bird: false, dog: false, cat: false },
        },
      },
    });
  });

  test('checks SelectedItemsManager renders button "unselect all"', () => {
    // ACT
    render(<SelectedItemsManager />);

    // ASSERT
    const button = screen.getByRole('button', { name: /unselect all/i });
    expect(button).toBeInTheDocument();
  });

  test('checks SelectedItemsManager renders button "download"', () => {
    // ACT
    render(<SelectedItemsManager />);

    // ASSERT
    const link = screen.getByRole('button', { name: /download/i });
    expect(link).toBeInTheDocument();
  });

  test('checks SelectedItemsManager renders text content', () => {
    // ACT
    render(<SelectedItemsManager />);

    // ASSERT
    expect(screen.getByText(/selected items:/i)).toBeInTheDocument();
  });
});
