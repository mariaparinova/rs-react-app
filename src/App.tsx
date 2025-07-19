import './App.css';
import { Component } from 'react';
import { TopControls } from './components/TopControls/TopControls.tsx';
import { Button, ButtonStyle } from './components/Button/Button.tsx';
import { ContentContainer } from './components/ContentContainer/ContentContainer.tsx';
import { PetCard } from './components/PetCard/PetCard.tsx';
import { Pet } from './types/pet.ts';
import { getPets } from './api-repositories/pets/pets.ts';
import { formatSearchInput } from './utils/formatSearchInput.ts';
import { Spinner } from './components/Spinner/Spinner.tsx';

export const SEARCH_TERM_KEY = 'searchTerm';

type Props = Record<string, never>;

interface State {
  searchTerm: string;
  pets: Pet[] | undefined;
  isLoading: boolean;
  shouldThrowError: boolean;
}

export class App extends Component<Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);

    const searchTerm = localStorage.getItem(SEARCH_TERM_KEY) || '';

    this.state = {
      searchTerm,
      pets: undefined,
      isLoading: false,
      shouldThrowError: false,
    };
  }

  componentDidMount() {
    this.fetchPets({ name: this.state.searchTerm });
  }

  componentDidUpdate(_: Props, prevState: State) {
    if (this.state.searchTerm !== prevState.searchTerm) {
      localStorage.setItem(SEARCH_TERM_KEY, this.state.searchTerm);

      this.fetchPets({ name: this.state.searchTerm });
    }
  }

  render() {
    const { searchTerm, pets, isLoading, shouldThrowError } = this.state;

    if (shouldThrowError) {
      throw new Error('Just a test! This error was thrown on purpose to check error handling');
    }

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

    return (
      <div className="app">
        <TopControls initialSearchTerm={searchTerm} onSearchTermChange={this.changeSearchTerm} isLoading={isLoading} />
        <ContentContainer>
          {isLoading && <Spinner />}
          {renderPets()}
        </ContentContainer>
        <Button
          onClick={() => {
            this.setState({ ...this.state, shouldThrowError: true });
          }}
          style={ButtonStyle.Secondary}
          isDisabled={isLoading}
          className="throw-error-btn"
        >
          Throw error
        </Button>
      </div>
    );
  }

  private async fetchPets(props: { name: string; offset?: number; limit?: number }): Promise<void> {
    this.setState({ ...this.state, isLoading: true });

    try {
      const pets = await getPets({ ...props, name: formatSearchInput(props.name) });

      this.setState({
        ...this.state,
        isLoading: false,
        pets,
      });
    } catch (error) {
      this.setState({
        ...this.state,
        isLoading: false,
      });

      this.setState({ ...this.state, shouldThrowError: true });

      if (error instanceof Error) console.warn(`Error: ${error.message}`);
    }
  }

  private changeSearchTerm = (searchTerm: string) => {
    this.setState({ ...this.state, searchTerm });
  };
}
