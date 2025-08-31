import './EmissionsTableColumnsManager.css';
import type { IEmissionsTableColumnsManagerProps } from './EmissionsTableColumnsManager.ts';
import { Checkbox } from '../../controls/checkbox/Checkbox.tsx';
import { Button, ButtonStyle, ButtonType } from '../../Button/Button.tsx';
import { type ChangeEvent, useCallback, useState } from 'react';
import type { TableHeader } from '../EmissionsExplorer.ts';

export function EmissionsTableColumnsManager(props: IEmissionsTableColumnsManagerProps) {
  const { options, initSelectedOptions, buttonClickHandler } = props;
  const [checkedValues, setCheckedValues] = useState<string[]>(initSelectedOptions);

  const checkboxChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target?.checked;
      const value = event.target?.name;

      if (isChecked) {
        setCheckedValues([...checkedValues, value]);
      } else {
        setCheckedValues([...checkedValues.filter((v) => v !== value)]);
      }
    },
    [checkedValues]
  );

  return (
    <div className="columns-manager">
      <div className="options">
        {options.map((option) => (
          <Checkbox
            id={option.id}
            label={option.label}
            key={option.id}
            name={option.name}
            disabled={option.disabled}
            onChange={checkboxChangeHandler}
            checked={checkedValues.includes(option.name)}
          />
        ))}
      </div>
      <Button
        style={ButtonStyle.Primary}
        type={ButtonType.Submit}
        onClick={() => buttonClickHandler(checkedValues as TableHeader[])}
        className="last-focusable"
      >
        Apply
      </Button>
    </div>
  );
}
