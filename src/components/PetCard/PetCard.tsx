import './PetCard.css';
import { Pet } from '../../types/pet.ts';

export const PetCard = ({ pet }: { pet: Pet }) => {
  return (
    <div className="pet-card">
      <h3>{pet.name}</h3>
      <div className="pet-id font-size-xs">{`id: ${pet.id}`}</div>
    </div>
  );
};
