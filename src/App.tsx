import { Component } from 'react';
import './App.css';
import { TopControls } from './components/TopControls/TopControls.tsx';
import { Button, ButtonStyle } from './components/Button/Button.tsx';
import { ContentContainer } from './components/Main/ContentContainer.tsx';
import { Table } from './components/Table/Table.tsx';
import { Pet } from './types/pet.ts';
import { SEARCH_TERM_KEY } from './constants.ts';
import { getPets } from './api-repositories/pets/pets.ts';
import { formatSearchInput } from './utils/formatSearchInput.ts';
import { Spinner } from './components/Spinner/Spinner.tsx';

interface AppState {
  searchTerm: string;
  pets: Pet[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

const initialAppState: AppState = {
  searchTerm: localStorage.getItem(SEARCH_TERM_KEY) || '',
  pets: undefined,
  isLoading: false,
  isError: false,
};

export class App extends Component {
  state: AppState = initialAppState;

  handlePetsChange = (value: AppState['pets']) => {
    this.setState({ ...this.state, pets: value });
  };

  changeSearchTerm = (value: AppState['searchTerm']) => {
    this.setState({ ...this.state, searchTerm: value });
  };

  async componentDidMount() {
    if (!this.state.pets) {
      this.setState({ ...this.state, isLoading: true });

      const searchTerm = localStorage.getItem(SEARCH_TERM_KEY);
      const props = searchTerm ? { name: formatSearchInput(searchTerm) } : {};
      const pets = await getPets(props);

      this.setState({
        ...this.state,
        isLoading: false,
        pets,
      });
    }
  }

  render() {
    if (this.state.isError) {
      throw new Error('Just a test! This error was thrown on purpose to check error handling');
    }

    return (
      <>
        {this.state.isLoading && <Spinner />}
        <TopControls
          inputSearchTerm={this.state.searchTerm}
          handleInputSearch={this.changeSearchTerm}
          handleButtonSearchClick={this.handlePetsChange}
        ></TopControls>
        <ContentContainer>
          <Table columnNames={['Id', 'Name']} tableData={this.state.pets || []}></Table>
        </ContentContainer>
        <Button
          onClick={() => this.setState({ ...this.state, isError: true })}
          style={ButtonStyle.Secondary}
          isDisabled={this.state.isLoading}
        >
          Throw error
        </Button>
      </>
    );
  }
}
