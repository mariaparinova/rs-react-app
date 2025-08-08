import './DetailedPetPage.css';
import { Link, useLocation } from 'react-router-dom';
import { Pet } from '../../types/pet.ts';
import IconCross from '../../icons/cross.svg?react';
import { ROUTES } from '../../router/routes.ts';
import IconAnimal from '../../icons/animal.svg?react';
import IconInsect from '../../icons/insect.svg?react';
import IconBird from '../../icons/bird.svg?react';
import IconDog from '../../icons/dog.svg?react';
import IconCat from '../../icons/cat.svg?react';
import IconUnknown from '../../icons/question-mark.svg?react';
import IconLion from '../../icons/lion.svg?react';
import { Spinner } from '../../components/Spinner/Spinner.tsx';
import { useQueryPet } from '../../hooks/useQueryPet.ts';
import { ButtonStyle } from '../../components/Button/Button.types.ts';
import { Button } from '../../components/Button/Button.tsx';

const getTypes = (pet: Pet): string => {
  const types = Object.entries(pet.types).reduce((acc, [key, val]) => (val ? `${acc} ${key}` : acc), '');
  return types ? types : 'unspecified';
};

export function DetailedPetPage() {
  const location = useLocation();

  const { isPending, data: pet, error, invalidateQueries } = useQueryPet();

  const getIcon = () => {
    switch (true) {
      case pet?.types.animal:
        return <IconAnimal data-testid="icon-animal" />;
      case pet?.types.insect:
        return <IconInsect data-testid="icon-insect" />;
      case pet?.types.bird:
        return <IconBird data-testid="icon-bird" />;
      case pet?.types.dog:
        return <IconDog data-testid="icon-dog" />;
      case pet?.types.cat:
        return <IconCat data-testid="icon-cat" />;
      default:
        return <IconUnknown data-testid="icon-unspecified" />;
    }
  };

  const renderBgOverlay = () => {
    return (
      <Link
        className="bg-overlay"
        to={{
          pathname: `${ROUTES.ROOT}`,
          search: `${location.search}`,
        }}
      ></Link>
    );
  };

  const renderIconClose = () => {
    return (
      <Link
        className="icon-cross"
        to={{
          pathname: `${ROUTES.ROOT}`,
          search: `${location.search}`,
        }}
      >
        <IconCross />
      </Link>
    );
  };

  const renderDetails = () => {
    if (isPending) {
      return <Spinner />;
    }

    if (error) {
      return (
        <>
          <h2>Pet not found</h2>
          <IconLion />
        </>
      );
    }

    if (pet) {
      return (
        <div className="details">
          <h2>{pet.name}</h2>
          {getIcon()}
          {getTypes(pet)}
          <div className="pet-id font-size-xs">{`id: ${pet.id}`}</div>
          <Button style={ButtonStyle.Secondary} isDisabled={false} onClick={invalidateQueries}>
            Remove pet from cash
          </Button>
        </div>
      );
    }
  };

  return (
    <>
      {renderBgOverlay()}
      <div className={`detailed-pet ${!pet && 'not-found'}`} data-testid="detailed-pet">
        {renderIconClose()}
        {renderDetails()}
      </div>
    </>
  );
}
