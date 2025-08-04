import { render, screen } from '@testing-library/react';
import { PetCard } from './PetCard.tsx';
import { Pet } from '../../types/pet.ts';
import { describe, expect, test } from 'vitest';

describe('<PetCard>', () => {
  test('check pet card has pet name', () => {
    // ARRANGE
    const pet: Pet = {
      name: 'Horse',
    } as Pet;

    // ACT
    render(<PetCard pet={pet} onClick={() => {}} />);

    //ASSERT
    expect(screen.getByText(pet.name)).toBeInTheDocument();
  });

  test('check pet card has checkbox', () => {
    // ARRANGE
    const pet: Pet = {
      name: 'Horse',
    } as Pet;

    // ACT
    render(<PetCard pet={pet} onClick={() => {}} />);

    //ASSERT
    const petCard = screen.getByTestId('pet-card');
    const checkbox = petCard.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(petCard).toContainElement(checkbox!);
  });
});
