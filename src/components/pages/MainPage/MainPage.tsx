'use client';

import styles from './MainPage.module.css';
import { useMemo } from 'react';
import { useQueryPets } from '../../../hooks/useQueryPets.ts';
import { PetCard } from '../../PetCard/PetCard.tsx';
import { Button } from '../../Button/Button.tsx';
import TopControls from './TopControls/TopControls.tsx';
import { Pagination } from '../../Pagination/Pagination.tsx';
import SelectedItemsManager from './SelectedItemsManager/SelectedItemsManager.tsx';
import { useRouter } from 'i18n/navigation';
import { useSearchParams } from '../../../hooks/useSearchParams.ts';
import { useTranslations } from 'next-intl';
import { useSearchTerm } from '../../../hooks/useSearchTerm.ts';
import { ButtonStyle } from '../../Button/Button.types.ts';
import Spinner from '../../Spinner/Spinner.tsx';

const ITEMS_PER_PAGE = 10;
const SEARCH_PARAMS_PAGE = 'page';

export default function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useSearchTerm();
  const activePageSearchParam = searchParams?.get(SEARCH_PARAMS_PAGE);
  const router = useRouter();

  const activePage = useMemo(() => {
    const activePage = parseInt(activePageSearchParam || '', 10);
    return Number.isInteger(activePage) ? activePage : 1;
  }, [activePageSearchParam]);

  const { isPending, data, error, invalidateQueries } = useQueryPets({
    queryKey: [activePage, searchTerm],
    queryFnParams: { searchTerm, activePage, pageSize: ITEMS_PER_PAGE },
  });

  const setActivePage = (val: number) => {
    const newUrlSearchParams = new URLSearchParams(searchParams || '');
    newUrlSearchParams.set(SEARCH_PARAMS_PAGE, `${val}`);
    setSearchParams(newUrlSearchParams);
  };

  const renderPets = () => {
    if (data?.pets.length === 0) {
      return <div>No pets found</div>;
    }

    const handleClick = (petId: string) => {
      const path = `/pets/${petId}`;
      router.push(`${path}?${searchParams?.toString()}`);
    };

    return (
      <div className={styles.pets}>
        {data?.pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} onClick={() => handleClick(pet.id)} />
        ))}
      </div>
    );
  };

  const changeSearchTerm = (searchTerm: string): void => {
    setSearchTerm(searchTerm);
    setActivePage(1);
  };

  const t = useTranslations('MainPage');

  return (
    <div className={styles.mainPage}>
      <Button style={ButtonStyle.Secondary} isDisabled={false} onClick={invalidateQueries}>
        {t('clearCache')}
      </Button>
      <TopControls initialSearchTerm={searchTerm} onSearchTermChange={changeSearchTerm} isLoading={isPending} />
      <div className={styles.contentContainer}>
        {isPending && <Spinner />}
        {error && <div>{error.message}</div>}
        {data && renderPets()}
      </div>
      <Pagination
        totalPages={data?.totalPages}
        activePage={activePage}
        nextPageClickHandler={() => setActivePage(activePage + 1)}
        previousPageClickHandler={() => setActivePage(activePage - 1)}
        isDisabled={isPending}
      />
      <SelectedItemsManager />
    </div>
  );
}
