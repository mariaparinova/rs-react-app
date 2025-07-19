import { PetDto } from '../api-repositories/pets/pets.types.ts';
import { convertPetDtoToPet } from './petService.ts';

describe('petService', () => {
  test('checks that pet is converted correctly', () => {
    // ARRANGE
    const petDto: PetDto = {
      uid: 'id123',
      name: 'Albatross',
      earthAnimal: true,
      earthInsect: false,
      avian: false,
      canine: false,
      feline: false,
    };

    // ACT
    const pet = convertPetDtoToPet(petDto);

    // ASSERT
    expect(pet).toEqual({
      id: 'id123',
      name: 'Albatross',
    });
  });
});
