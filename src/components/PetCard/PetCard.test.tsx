import { render, screen } from '@testing-library/react';
import { PetCard } from './PetCard.tsx';
import { Pet } from '../../types/pet.ts';

describe('<PetCard>', () => {
  test('check pet card has pet name', () => {
    // ARRANGE
    const pet: Pet = {
      id: 'test-123-id',
      name: 'Horse',
    };

    // ACT
    render(<PetCard pet={pet} />);

    //ASSERT
    expect(screen.getByText(pet.name)).toBeInTheDocument();
  });

  test('check pet card has pet id', () => {
    // ARRANGE
    const pet: Pet = {
      id: 'test-124-id',
      name: 'Bird',
    };

    // ACT
    render(<PetCard pet={pet} />);

    //ASSERT
    expect(screen.getByText(`id: ${pet.id}`)).toBeInTheDocument();
  });
});
