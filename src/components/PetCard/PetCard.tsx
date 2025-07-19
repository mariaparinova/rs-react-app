import './PetCard.css';
import { Component } from 'react';
import { Pet } from '../../types/pet.ts';

interface PetCardProps {
  pet: Pet;
}

export class PetCard extends Component<PetCardProps> {
  render() {
    const { pet } = this.props;

    return (
      <div className="pet-card">
        <h3>{pet.name}</h3>
        <div className="pet-id font-size-xs">{`id: ${pet.id}`}</div>
      </div>
    );
  }
}
