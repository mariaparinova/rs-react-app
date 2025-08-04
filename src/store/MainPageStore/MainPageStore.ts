import { MainPageStore } from './MainPageStore.types.ts';
import { create } from 'zustand/react';
import { Pet } from '../../types/pet.ts';

export const useCatalogStore = create<MainPageStore>((set) => ({
  selectedPets: {},

  setSelectedPets: (pet: Pet) =>
    set((state) => {
      if (state.selectedPets[pet.id]) {
        const clonedSelectedPets: Record<string, Pet> = {};

        for (const selectedPet of Object.values(state.selectedPets)) {
          if (selectedPet.id !== pet.id) {
            clonedSelectedPets[selectedPet.id] = selectedPet;
          }
        }

        return {
          selectedPets: clonedSelectedPets,
        };
      }

      return { ...state, selectedPets: { ...state.selectedPets, [pet.id]: pet } };
    }),

  clearSelectedPets: () =>
    set((state) => {
      return { ...state, selectedPets: {} };
    }),
}));
