import './TopControls.css';
import { ChangeEvent, FormEventHandler, useState } from 'react';
import { InputSearch } from '../../../components/inputs/InputSearch/InputSearch.tsx';
import { Button } from '../../../components/Button/Button.tsx';
import { TopControlsProps } from './TopControls.types.ts';
import { ButtonStyle, ButtonType } from '../../../components/Button/Button.types.ts';

export function TopControls(props: TopControlsProps) {
  const { isLoading, onSearchTermChange, initialSearchTerm } = props;
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);

  const handleBtnClick: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSearchTermChange(searchTerm);
  };

  const handleInputChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <form className="top-controls" onSubmit={handleBtnClick} data-testid="top-controls">
      <InputSearch
        id="search-input"
        placeholder="Search by name"
        value={searchTerm}
        isDisabled={isLoading}
        onChange={handleInputChanges}
      />
      <Button style={ButtonStyle.Primary} isDisabled={isLoading} type={ButtonType.Submit}>
        Search
      </Button>
    </form>
  );
}
