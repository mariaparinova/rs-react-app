import './EmissionsExplorer.css';
import { type ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';
import { TableHeader } from './EmissionsExplorer.ts';
import { InputType } from '../controls/input/Input.ts';
import { Input } from '../controls/input/Input.tsx';
import { Button, ButtonStyle } from '../Button/Button.tsx';
import { Select } from '../controls/select/Select.tsx';
import { EmissionsTable } from './EmissionsTable/EmissionsTable.tsx';
import { useQueryData } from '../../hooks/useQueryData.ts';
import { transformDataDtoToEmissionsTableData } from '../../services/emissionService.ts';
import { Sorting } from '../../types/sorting.ts';
import { Modal } from '../Modal/Modal.tsx';
import IconSearch from '../../icons/search.svg?react';
import { EmissionsTableColumnsManager } from './EmissionsTableColumnsManager/EmissionsTableColumnsManager.tsx';

const permanentTableHeaders = [
  TableHeader.Country,
  TableHeader.IsoCode,
  TableHeader.Year,
  TableHeader.Population,
  TableHeader.Co2,
  TableHeader.CementCo2PerCapita,
];

export function EmissionsExplorer() {
  const currentYear = new Date().getFullYear();
  const [tableHeaders, setTableHeaders] = useState<TableHeader[]>(permanentTableHeaders);
  const inputCountryRef = useRef<HTMLInputElement>(null);
  const [year, setYear] = useState<number>(currentYear);
  const [country, setCountry] = useState<string>('');
  const [sortingBy, setSortingBy] = useState<Sorting>(Sorting.NameAsc);
  const { data } = useQueryData();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const preparedData = useMemo(() => {
    return transformDataDtoToEmissionsTableData({
      data,
      country,
      year,
      tableHeaders: tableHeaders,
      sorting: sortingBy,
    });
  }, [data, country, year, tableHeaders, sortingBy]);

  const changeCountry = useCallback(() => setCountry(inputCountryRef?.current?.value || ''), [inputCountryRef]);

  const controlSearch = useMemo(
    () => (
      <div className="control">
        <Input id="search" name="search" label="country" inputType={InputType.Search} ref={inputCountryRef} />
        <Button style={ButtonStyle.IconBtn} onClick={changeCountry}>
          <IconSearch />
        </Button>
      </div>
    ),
    [inputCountryRef, changeCountry]
  );

  const changeYear = useCallback((e: ChangeEvent<HTMLSelectElement>) => setYear(parseInt(e.target.value)), []);

  const controlYear = useMemo(
    () => (
      <div className="control">
        <Select
          id="year"
          name="year"
          label="year"
          values={getYears()}
          selectedValue={`${year}`}
          onChange={changeYear}
        />
      </div>
    ),
    [year, changeYear]
  );

  const sort = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setSortingBy(e.target.value as Sorting);
  }, []);

  const controlSortBy = useMemo(
    () => (
      <div className="control">
        <Select
          id="sort"
          name="sort"
          label="sort by"
          values={[Sorting.NameAsc, Sorting.NameDesc, Sorting.PopulationAsc, Sorting.PopulationDesc]}
          selectedValue={sortingBy}
          onChange={sort}
        />
      </div>
    ),
    [sortingBy, sort]
  );

  const renderTableExplanation = () => {
    return (
      <p className="table-explanation">
        * Click{' '}
        <a href="https://github.com/owid/co2-data/blob/master/owid-co2-codebook.csv" target="_blank" rel="noreferrer">
          here
        </a>{' '}
        for detailed explanations of each column, including descriptions and measurement units
      </p>
    );
  };

  return (
    <div className="explorer">
      <div className="controls-container">
        {controlSearch}
        {controlYear}
        {controlSortBy}
      </div>
      <EmissionsTable headers={tableHeaders} data={preparedData} />
      <Button className="add" style={ButtonStyle.Secondary} onClick={() => setIsModalOpen(true)}>
        Add fields
      </Button>
      {renderTableExplanation()}
      <Modal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
        <EmissionsTableColumnsManager
          options={createColumnsManagerOptions()}
          buttonClickHandler={(val) => {
            setTableHeaders(val);
            setIsModalOpen(false);
          }}
          initSelectedOptions={tableHeaders}
        />
      </Modal>
    </div>
  );
}

function getYears(): string[] {
  const from = 1750;
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let i = from; i <= currentYear; i++) {
    years.push(`${i}`);
  }

  return years;
}

function createColumnsManagerOptions() {
  return Object.values(TableHeader).map((value) => {
    return {
      id: `option-${value}`,
      label: value,
      name: value,
      disabled: permanentTableHeaders.includes(value),
    };
  });
}
