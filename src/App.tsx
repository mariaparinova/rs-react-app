import './App.css';
import { useEffect, useState } from 'react';
import { TopControls } from './components/TopControls/TopControls.tsx';
import { ContentContainer } from './components/ContentContainer/ContentContainer.tsx';
import { PetCard } from './components/PetCard/PetCard.tsx';
import { Pet } from './types/pet.ts';
import { getPets } from './api-repositories/pets/pets.ts';
import { formatSearchInput } from './utils/formatSearchInput.ts';
import { Spinner } from './components/Spinner/Spinner.tsx';

export const SEARCH_TERM_KEY = 'searchTerm';
const initSearchTerm = localStorage.getItem(SEARCH_TERM_KEY) || '';

export function App() {
  const [searchTerm, setSearchTerm] = useState<string>(initSearchTerm);
  const [pets, setPets] = useState<Pet[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shouldThrowError, setShouldThrowError] = useState<boolean>(false);

  const fetchPets = async (params: { name: string; offset?: number; limit?: number }) => {
    const { name, offset, limit } = params;

    try {
      setIsLoading(true);

      const pets = await getPets({ name: formatSearchInput(name), pageNumber: offset, pageSize: limit });

      setPets(pets);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setShouldThrowError(true);

      if (error instanceof Error) {
        console.warn(`Error: ${error.message}`);
      }
    }
  };

  const renderPets = () => {
    if (pets?.length === 0) {
      return <div>No pets found</div>;
    }

    return (
      <div className="pets">
        {pets?.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    );
  };

  const changeSearchTerm = (searchTerm: string): void => {
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    localStorage.setItem(SEARCH_TERM_KEY, searchTerm);
    fetchPets({ name: searchTerm });
  }, [searchTerm]);

  if (shouldThrowError) {
    throw new Error('Just a test! This error was thrown on purpose to check error handling');
  }

  return (
    <div className="app">
      <TopControls initialSearchTerm={searchTerm} onSearchTermChange={changeSearchTerm} isLoading={isLoading} />
      <ContentContainer>
        {isLoading && <Spinner />}
        {renderPets()}
      </ContentContainer>
    </div>
  );
}
