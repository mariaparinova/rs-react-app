import './PetCard.css';
import { Pet } from '../../types/pet.ts';

export const PetCard = ({ pet }: { pet: Pet }) => {
  return (
    <div className="pet-card">
      <h4>{pet.name}</h4>
    </div>
  );
};
