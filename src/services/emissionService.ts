import type { CountriesDatasetDto, CountryDataForYear } from '../co2-api/api.types.ts';
import { TableHeader } from '../components/EmissionsExplorer/EmissionsExplorer.ts';
import { Sorting } from '../types/sorting.ts';

interface TransformDataDtoToEmissionsTableDataProps {
  data: CountriesDatasetDto;
  tableHeaders: TableHeader[];
  country?: string;
  year?: number;
  sorting?: Sorting;
}

export function transformDataDtoToEmissionsTableData(props: TransformDataDtoToEmissionsTableDataProps): string[][] {
  const { data, country, year, tableHeaders, sorting } = props;

  let countyNames = Object.keys(data);

  if (country) {
    countyNames = countyNames.filter((countyName) => countyName.toLowerCase().includes(country.toLowerCase()));
  }

  switch (sorting) {
    case Sorting.NameAsc: {
      countyNames.sort((a, b) => a.localeCompare(b));
      break;
    }
    case Sorting.NameDesc: {
      countyNames.sort((a, b) => b.localeCompare(a));
      break;
    }
    case Sorting.PopulationAsc: {
      countyNames.sort((a, b) => {
        const aDataForYear = data[a].data.find((d) => d.year === year);
        const bDataForYear = data[b].data.find((d) => d.year === year);

        return (aDataForYear?.population || 0) - (bDataForYear?.population || 0);
      });
      break;
    }
    case Sorting.PopulationDesc: {
      countyNames.sort((a, b) => {
        const aDataForYear = data[a].data.find((d) => d.year === year);
        const bDataForYear = data[b].data.find((d) => d.year === year);

        return (bDataForYear?.population || 0) - (aDataForYear?.population || 0);
      });
      break;
    }
  }

  const tableData: string[][] = [];

  countyNames.forEach((countyName) => {
    const countyDataForYear = data[countyName].data.find((d) => d.year === year);
    const dataForTableRow: string[] = [];

    tableHeaders.forEach((header) => {
      if (header === TableHeader.Country) {
        dataForTableRow.push(countyName);
      } else if (header === TableHeader.IsoCode) {
        dataForTableRow.push(data[countyName].iso_code || 'n/a');
      } else {
        dataForTableRow.push(transformCountryDataForYearItemToString(countyDataForYear, header));
      }
    });
    tableData.push(dataForTableRow);
  });

  return tableData;
}

function transformCountryDataForYearItemToString(
  countyDataForYear: CountryDataForYear | undefined,
  header: keyof CountryDataForYear
) {
  const countyDataForYearValue: string | number | undefined = countyDataForYear?.[header];

  if (countyDataForYearValue === 0.0) {
    return `0.0`;
  }

  if (countyDataForYearValue === undefined) {
    return `n/a`;
  }

  return `${countyDataForYearValue}`;
}
