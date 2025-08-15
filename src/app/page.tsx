'use client';

import styles from './page.module.css';
import { useSearchTerm } from '../hooks/useSearchTerm.ts';
import { ReactNode, useMemo } from 'react';
import { useQueryPets } from '../hooks/useQueryPets.ts';
import { PetCard } from '../components/PetCard/PetCard.tsx';
import { Button } from '../components/Button/Button.tsx';
import { ButtonStyle } from '../components/Button/Button.types.ts';
import TopControls from './(main)/TopControls/TopControls.tsx';
import Spinner from '../components/Spinner/Spinner.tsx';
import { Pagination } from '../components/Pagination/Pagination.tsx';
import SelectedItemsManager from './(main)/SelectedItemsManager/SelectedItemsManager.tsx';
import { useRouter } from 'next/navigation';
import { useSearchParams } from '../hooks/useSearchParams.ts';

const ITEMS_PER_PAGE = 10;
const SEARCH_PARAMS_PAGE = 'page';

function MainPage({ children }: { children: ReactNode }) {
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

  return (
    <div className={styles.mainPage}>
      <Button style={ButtonStyle.Secondary} isDisabled={false} onClick={invalidateQueries}>
        Clear cache
      </Button>
      <TopControls initialSearchTerm={searchTerm} onSearchTermChange={changeSearchTerm} isLoading={isPending} />
      <div className={styles.contentContainer}>
        {isPending && <Spinner />}
        {error && <div>{error.message}</div>}
        {data && renderPets()}
      </div>
      {children}
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

export default MainPage;
