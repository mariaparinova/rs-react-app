import './SelectedItemsManager.css';
import { Button } from '../../../components/Button/Button.tsx';
import { ButtonStyle } from '../../../components/Button/Button.types.ts';
import { useCatalogStore } from '../../../store/MainPageStore/MainPageStore.ts';
import clsx from 'clsx';

export const SelectedItemsManager = () => {
  const { selectedPets, clearSelectedPets } = useCatalogStore();
  const selectedPetsLength = Object.keys(selectedPets).length;
  const className = clsx('selected-items-manager', selectedPetsLength === 0 && 'hidden');
  const pets = Object.values(selectedPets);

  const renderDownloadCSVLink = () => {
    const headers = ['id', 'name', 'url'];
    const rows = pets.map((pet) => `${pet.id},${pet.name}, ${window.location.host}/pets/${pet.id}`);
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const url = URL.createObjectURL(blob);
    const filename = `${pets.length}_items.csv`;

    const btnClassName = clsx(pets.length && 'link-btn');
    const btnInnerContent = pets.length ? (
      <a href={url} download={filename}>
        Download
      </a>
    ) : (
      'Download'
    );

    return (
      <Button style={ButtonStyle.Secondary} isDisabled={!pets.length} className={btnClassName}>
        {btnInnerContent}
      </Button>
    );
  };

  return (
    <div className={className} data-testid="selected-items-manager">
      <div>{`selected items: ${selectedPetsLength}`}</div>
      <div className="buttons-container">
        <Button style={ButtonStyle.Secondary} isDisabled={!pets.length} onClick={() => clearSelectedPets()}>
          Unselect all
        </Button>
        {renderDownloadCSVLink()}
      </div>
    </div>
  );
};
