import styles from './SelectedItemsManager.module.css';
import ButtonStyles from '../../../components/Button/Button.module.css';
import { Button } from '../../../components/Button/Button.tsx';
import { ButtonStyle } from '../../../components/Button/Button.types.ts';
import { useCatalogStore } from '../../../store/MainPageStore/MainPageStore.ts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function SelectedItemsManager() {
  const { selectedPets, clearSelectedPets } = useCatalogStore();
  const selectedPetsLength = Object.keys(selectedPets).length;
  const className = clsx(styles.selectedItemsManager, selectedPetsLength === 0 && styles.hidden);
  const pets = Object.values(selectedPets);
  const t = useTranslations('MainPage');

  return (
    <div className={className}>
      <div>{`${t('selectedItems')}: ${selectedPetsLength}`}</div>
      <div className={styles.buttonsContainer}>
        <Button style={ButtonStyle.Secondary} isDisabled={!pets.length} onClick={clearSelectedPets}>
          {t('unselectAll')}
        </Button>
        <Button className={ButtonStyles.linkBtn} style={ButtonStyle.Secondary} isDisabled={!pets.length}>
          <Link href={`/api/download/pets?ids=${pets.map((pet) => pet.id).join(',')}`} prefetch={false}>
            {t('download')}
          </Link>
        </Button>
      </div>
    </div>
  );
}
