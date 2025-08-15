'use client';

import styles from './page.module.css';
import { Pet } from '../../../../types/pet.ts';
import IconCross from '../../../../../public/icons/cross.svg';
import IconAnimal from '../../../../../public/icons/animal.svg';
import IconInsect from '../../../../../public/icons/insect.svg';
import IconBird from '../../../../../public/icons/bird.svg';
import IconDog from '../../../../../public/icons/dog.svg';
import IconCat from '../../../../../public/icons/cat.svg';
import IconUnknown from '../../../../../public/icons/question-mark.svg';
import IconLion from '../../../../../public/icons/lion.svg';
import Spinner from '../../../../components/Spinner/Spinner.tsx';
import { useQueryPet } from '../../../../hooks/useQueryPet.ts';
import { ButtonStyle } from '../../../../components/Button/Button.types.ts';
import { Button } from '../../../../components/Button/Button.tsx';
import { Link } from 'i18n/navigation.ts';
import { useParams, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

const getTypes = (pet: Pet): string => {
  const types = Object.entries(pet.types).reduce((acc, [key, val]) => (val ? `${acc} ${key}` : acc), '');
  return types ? types : 'unspecified';
};

export default function DetailedPetPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const { isPending, data: pet, error, invalidateQueries } = useQueryPet(id);
  const t = useTranslations('Pets');

  const getIcon = () => {
    switch (true) {
      case pet?.types.animal:
        return <IconAnimal />;
      case pet?.types.insect:
        return <IconInsect />;
      case pet?.types.bird:
        return <IconBird />;
      case pet?.types.dog:
        return <IconDog />;
      case pet?.types.cat:
        return <IconCat />;
      default:
        return <IconUnknown />;
    }
  };

  const renderIconClose = () => {
    return (
      <Link
        className={styles.iconCross}
        href={{
          pathname: `/`,
          query: searchParams?.toString(),
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
        <div className={styles.details}>
          <h2>{pet.name}</h2>
          {getIcon()}
          {getTypes(pet)}
          <div className={`${styles.petId} font-size-xs`}>{`id: ${pet.id}`}</div>
          <Button style={ButtonStyle.Secondary} isDisabled={false} onClick={invalidateQueries}>
            {t('removePetFromCache')}
          </Button>
        </div>
      );
    }
  };

  return (
    <div className={`${styles.detailedPet} ${!pet && styles.notFound}`}>
      {renderIconClose()}
      {renderDetails()}
    </div>
  );
}
