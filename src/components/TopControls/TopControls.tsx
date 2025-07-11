import { ChangeEvent, Component } from 'react';
import { InputSearch } from '../inputs/InputSearch/InputSearch.tsx';
import { Button, ButtonStyle } from '../Button/Button.tsx';
import { getPets } from '../../api-repositories/pets/pets.ts';
import { SEARCH_TERM_KEY } from '../../constants.ts';
import { formatSearchInput } from '../../utils/formatSearchInput.ts';
import { Pet } from '../../types/pet.ts';

interface TopControlsProps {
  inputSearchTerm: string;
  handleInputSearch: (value: string) => void;
  handleButtonSearchClick: (value: Pet[]) => void;
}

interface TopControlsState {
  isLoading: boolean;
}

const initTopControlsState: TopControlsState = {
  isLoading: false,
};

export class TopControls extends Component<TopControlsProps> {
  state = initTopControlsState;

  render() {
    const { inputSearchTerm, handleInputSearch, handleButtonSearchClick } = this.props;

    const handleBtnClick = async () => {
      if (localStorage.getItem(SEARCH_TERM_KEY) === inputSearchTerm) {
        return;
      }

      this.setState({ isLoading: true });

      const pets = await getPets({ name: formatSearchInput(inputSearchTerm) });
      this.setState({ isLoading: false });
      localStorage.setItem(SEARCH_TERM_KEY, inputSearchTerm);
      handleButtonSearchClick(pets);
    };

    const handleInputChanges = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      handleInputSearch(value);
    };

    return (
      <div>
        <InputSearch value={inputSearchTerm} onChange={handleInputChanges} />
        <Button onClick={handleBtnClick} style={ButtonStyle.Primary} isDisabled={this.state.isLoading}>
          Search
        </Button>
      </div>
    );
  }
}
