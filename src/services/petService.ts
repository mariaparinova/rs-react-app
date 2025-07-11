import { Pet } from '../types/pet.ts';
import { PetDto } from '../api-repositories/pets/pets.types.ts';

export const convertPetDtoToPet = (petDto: PetDto): Pet => {
  return {
    id: petDto.uid,
    name: petDto.name,
  };
};
