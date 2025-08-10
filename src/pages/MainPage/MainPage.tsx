import './MainPage.css';
import { useMemo } from 'react';
import { PetCard } from '../../components/PetCard/PetCard.tsx';
import { TopControls } from './TopControls/TopControls.tsx';
import { Spinner } from '../../components/Spinner/Spinner.tsx';
import { Pagination } from '../../components/Pagination/Pagination.tsx';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useSearchTerm } from '../../hooks/useSearchTerm.hook.ts';
import { getDetailedPetPagePath } from '../../router/router.tsx';
import { SelectedItemsManager } from './SelectedItemsManager/SelectedItemsManager.tsx';
import { useQueryPets } from '../../hooks/useQueryPets.ts';
import { Button } from '../../components/Button/Button.tsx';
import { ButtonStyle } from '../../components/Button/Button.types.ts';

const ITEMS_PER_PAGE = 10;
export const SEARCH_PARAMS_PAGE = 'page';

export function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useSearchTerm();
  const location = useLocation();
  const activePageSearchParam = searchParams.get(SEARCH_PARAMS_PAGE);
  const navigate = useNavigate();

  const activePage = useMemo(() => {
    const activePage = parseInt(activePageSearchParam || '', 10);
    return Number.isInteger(activePage) ? activePage : 1;
  }, [activePageSearchParam]);

  const { isPending, data, error, invalidateQueries } = useQueryPets({
    queryKey: [activePage, searchTerm],
    queryFnParams: { searchTerm, activePage, pageSize: ITEMS_PER_PAGE },
  });

  const setActivePage = (val: number) => {
    const newUrlSearchParams = new URLSearchParams(searchParams);
    newUrlSearchParams.set(SEARCH_PARAMS_PAGE, `${val}`);
    setSearchParams(newUrlSearchParams);
  };

  const renderPets = () => {
    if (data?.pets.length === 0) {
      return <div>No pets found</div>;
    }

    return (
      <div className="pets">
        {data?.pets.map((pet) => (
          <PetCard
            key={pet.id}
            pet={pet}
            onClick={() =>
              navigate({
                pathname: getDetailedPetPagePath({ petId: pet.id }),
                search: `${location.search}`,
              })
            }
          />
        ))}
      </div>
    );
  };

  const changeSearchTerm = (searchTerm: string): void => {
    setSearchTerm(searchTerm);
    setActivePage(1);
  };

  return (
    <div className="main-page">
      <Button style={ButtonStyle.Secondary} isDisabled={false} onClick={invalidateQueries}>
        Clear cash
      </Button>
      <TopControls initialSearchTerm={searchTerm} onSearchTermChange={changeSearchTerm} isLoading={isPending} />
      <div className="content-container" data-testid="content-container">
        {isPending && <Spinner />}
        {error && <div>{error.message}</div>}
        {data && renderPets()}
      </div>
      <Outlet />
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
