export interface CheckboxProps {
  id: string;
  isChecked: boolean;
  onChange: () => void;
  label?: string;
  inputClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
}
