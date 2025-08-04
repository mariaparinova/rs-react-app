import './DetailedPetPage.css';
import { Link, useLoaderData, useLocation } from 'react-router-dom';
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

const getTypes = (pet: Pet): string => {
  const types = Object.entries(pet.types).reduce((acc, [key, val]) => (val ? `${acc} ${key}` : acc), '');
  return types ? types : 'unspecified';
};

export function DetailedPetPage() {
  const pet: Pet | null = useLoaderData<Pet>();
  const location = useLocation();

  const getIcon = () => {
    switch (true) {
      case pet.types.animal:
        return <IconAnimal data-testid="icon-animal" />;
      case pet.types.insect:
        return <IconInsect data-testid="icon-insect" />;
      case pet.types.bird:
        return <IconBird data-testid="icon-bird" />;
      case pet.types.dog:
        return <IconDog data-testid="icon-dog" />;
      case pet.types.cat:
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
    return (
      <div className="details">
        {getIcon()}
        {getTypes(pet)}
        <div className="pet-id font-size-xs">{`id: ${pet.id}`}</div>
      </div>
    );
  };

  return (
    <>
      {renderBgOverlay()}
      <div className={`detailed-pet ${!pet && 'not-found'}`} data-testid="detailed-pet">
        {renderIconClose()}
        <h2>{pet ? pet.name : 'Pet not found'}</h2>
        {pet ? renderDetails() : <IconLion />}
      </div>
    </>
  );
}
