import './App.css';
import { Component } from 'react';
import { TopControls } from './components/TopControls/TopControls.tsx';
import { Button, ButtonStyle } from './components/Button/Button.tsx';
import { ContentContainer } from './components/ContentContainer/ContentContainer.tsx';
import { Table } from './components/Table/Table.tsx';
import { Pet } from './types/pet.ts';
import { SEARCH_TERM_KEY } from './constants.ts';
import { getPets } from './api-repositories/pets/pets.ts';
import { formatSearchInput } from './utils/formatSearchInput.ts';
import { Spinner } from './components/Spinner/Spinner.tsx';

type Props = {};

interface State {
  searchTerm: string;
  pets: Pet[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

const initialAppState: State = {
  searchTerm: localStorage.getItem(SEARCH_TERM_KEY) || '',
  pets: undefined,
  isLoading: false,
  isError: false,
};

export class App extends Component<Props, State> {
  state: State = initialAppState;

  constructor(props: Props) {
    super(props);

    const searchTerm = localStorage.getItem(SEARCH_TERM_KEY) || '';

    this.state = {
      searchTerm,
      pets: undefined,
      isLoading: false,
      isError: false,
    };
  }

  componentDidMount() {
    this.fetchPets({ name: this.state.searchTerm });
  }

  componentDidUpdate(_: Props, prevState: State) {
    if (this.state.searchTerm !== prevState.searchTerm) {
      localStorage.setItem(SEARCH_TERM_KEY, this.state.searchTerm);

      this.fetchPets({ name: this.state.searchTerm})
    }
  }

  render() {
    if (this.state.isError) {
      throw new Error('Just a test! This error was thrown on purpose to check error handling');
    }

    return (
      <div className="app">
        <TopControls
          initialSearchTerm={this.state.searchTerm}
          onSearchTermChange={this.changeSearchTerm}
          isLoading={this.state.isLoading}
        ></TopControls>
        <ContentContainer>
          {this.state.isLoading && <Spinner />}
          <Table columnNames={['Id', 'Name']} tableData={this.state.pets || []}></Table>
        </ContentContainer>
        <Button
          onClick={() => this.setState({ ...this.state, isError: true })}
          style={ButtonStyle.Secondary}
          isDisabled={this.state.isLoading}
          className="throw-error-btn"
        >
          Throw error
        </Button>
      </div>
    );
  }

  private async fetchPets(props: {name: string, offset?: number, limit?: number}): Promise<void> {
    this.setState({ ...this.state, isLoading: true });

    try {
      const pets = await getPets({...props, name: formatSearchInput(props.name)});

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
      console.warn(`Error during fetching pets: ${error}`);
    }
  }

  private changeSearchTerm = (searchTerm: string) => {
    this.setState({ ...this.state, searchTerm });
  };
}
