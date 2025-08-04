import { Pet } from '../../types/pet.ts';

export interface MainPageStore {
  selectedPets: Record<string, Pet>;
  setSelectedPets: (pet: Pet) => void;
  clearSelectedPets: () => void;
}
