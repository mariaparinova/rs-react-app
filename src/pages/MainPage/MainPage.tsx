import './MainPage.css';
import { useEffect, useMemo, useState } from 'react';
import { Pet } from '../../types/pet.ts';
import { getPets } from '../../api-repositories/pets/pets.ts';
import { formatSearchInput } from '../../utils/formatSearchInput.ts';
import { PetCard } from '../../components/PetCard/PetCard.tsx';
import { TopControls } from './TopControls/TopControls.tsx';
import { Spinner } from '../../components/Spinner/Spinner.tsx';
import { Pagination } from '../../components/Pagination/Pagination.tsx';
import { Outlet, useLocation, useNavigate, useNavigation, useSearchParams } from 'react-router-dom';
import { useSearchTerm } from '../../hooks/useSearchTerm.hook.ts';
import { getDetailedPetPagePath } from '../../router/router.tsx';
import { SelectedItemsManager } from './SelectedItemsManager/SelectedItemsManager.tsx';
import { delay } from '../../utils/delay.ts';

const ITEMS_PER_PAGE = 10;
export const SEARCH_PARAMS_PAGE = 'page';

export function MainPage() {
  const [pets, setPets] = useState<Pet[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
  const [fetchPetsErrorMessage, setFetchPetsErrorMessage] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useSearchTerm();
  const location = useLocation();
  const activePageSearchParam = searchParams.get(SEARCH_PARAMS_PAGE);
  const navigation = useNavigation();
  const navigate = useNavigate();

  const activePage = useMemo(() => {
    const activePage = parseInt(activePageSearchParam || '', 10);
    return Number.isInteger(activePage) ? activePage : 1;
  }, [activePageSearchParam]);

  const setActivePage = (val: number) => {
    const newUrlSearchParams = new URLSearchParams(searchParams);
    newUrlSearchParams.set(SEARCH_PARAMS_PAGE, `${val}`);
    setSearchParams(newUrlSearchParams);
  };

  const fetchPets = async (params: { name: string; offset?: number }) => {
    const { name, offset } = params;

    try {
      setIsLoading(true);

      const { totalPages, pets } = await getPets({
        name: formatSearchInput(name),
        pageNumber: offset,
        pageSize: ITEMS_PER_PAGE,
      });

      setPets(pets);
      setTotalPages(totalPages);
      setFetchPetsErrorMessage(undefined);
    } catch (err) {
      if (err instanceof Error) {
        setFetchPetsErrorMessage(err.message);
      } else {
        setFetchPetsErrorMessage('Unknown error');
      }
    } finally {
      await delay(400);
      setIsLoading(false);
    }
  };

  const renderPets = () => {
    if (fetchPetsErrorMessage) {
      return <div>{fetchPetsErrorMessage}</div>;
    }

    if (pets?.length === 0) {
      return <div>No pets found</div>;
    }

    return (
      <div className="pets">
        {pets?.map((pet) => (
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

  useEffect(() => {
    fetchPets({ name: searchTerm, offset: activePage });
  }, [searchTerm, activePage]);

  return (
    <div className="main-page">
      <TopControls initialSearchTerm={searchTerm} onSearchTermChange={changeSearchTerm} isLoading={isLoading} />
      <div className="content-container" data-testid="content-container">
        {isLoading && <Spinner />}
        {renderPets()}
      </div>
      {navigation.state === 'loading' && <Spinner />}
      <Outlet />
      <Pagination
        totalPages={totalPages}
        activePage={activePage}
        nextPageClickHandler={() => setActivePage(activePage + 1)}
        previousPageClickHandler={() => setActivePage(activePage - 1)}
        isDisabled={isLoading}
      />
      <SelectedItemsManager />
    </div>
  );
}
