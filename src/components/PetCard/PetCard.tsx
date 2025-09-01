import styles from './PetCard.module.css';
import { Checkbox } from '../inputs/Checkbox/Checkbox.tsx';
import { useCatalogStore } from '../../store/MainPageStore/MainPageStore.ts';
import { PetCardProps } from './PetCard.types.ts';
import * as React from 'react';

export const PetCard = ({ pet, onClick }: PetCardProps) => {
  const { selectedPets, setSelectedPets } = useCatalogStore();

  const onClickHandler = (event: React.MouseEvent<HTMLInputElement>) => {
    const target = event.target as HTMLElement;

    if (target.tagName === 'INPUT') {
      return;
    }

    onClick();
  };

  return (
    <div className={styles.petCard} onClick={onClickHandler}>
      <span>{pet.name}</span>
      <Checkbox id={pet.id} isChecked={!!selectedPets[pet.id]} onChange={() => setSelectedPets(pet)} />
    </div>
  );
};
