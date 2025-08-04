import { Pet } from '../../types/pet.ts';

export interface PetCardProps {
  pet: Pet;
  onClick: () => void;
}
