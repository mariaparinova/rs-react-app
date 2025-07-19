import './TopControls.css';
import { ChangeEvent, Component, FormEventHandler } from 'react';
import { InputSearch } from '../inputs/InputSearch/InputSearch.tsx';
import { Button, ButtonStyle, ButtonType } from '../Button/Button.tsx';

export interface TopControlsProps {
  initialSearchTerm: string;
  isLoading: boolean;
  onSearchTermChange: (searchTerm: string) => void;
}

interface TopControlsState {
  searchTerm: string;
}

export class TopControls extends Component<TopControlsProps, TopControlsState> {
  constructor(props: TopControlsProps) {
    super(props);

    this.state = {
      searchTerm: props.initialSearchTerm,
    };
  }

  render() {
    const handleBtnClick: FormEventHandler<HTMLFormElement> = (event) => {
      event.preventDefault();
      this.props.onSearchTermChange(this.state.searchTerm);
    };

    const handleInputChanges = (event: ChangeEvent<HTMLInputElement>) => {
      this.setState({
        ...this.state,
        searchTerm: event.target.value,
      });
    };

    return (
      <form className="top-controls" onSubmit={handleBtnClick} data-testid="top-controls">
        <InputSearch
          id="search-input"
          placeholder="Search by name"
          value={this.state.searchTerm}
          isDisabled={this.props.isLoading}
          onChange={handleInputChanges}
        />
        <Button style={ButtonStyle.Primary} isDisabled={this.props.isLoading} type={ButtonType.Submit}>
          Search
        </Button>
      </form>
    );
  }
}
