import type { CheckboxProps } from '../../controls/checkbox/Checkbox.ts';
import type { TableHeader } from '../EmissionsExplorer.ts';

export interface IEmissionsTableColumnsManagerProps {
  options: CheckboxProps[];
  initSelectedOptions: string[];
  buttonClickHandler: (val: TableHeader[]) => void;
}
