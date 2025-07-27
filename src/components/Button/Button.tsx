import './Button.css';
import { ButtonProps, ButtonType } from './Button.types.ts';

export function Button(props: ButtonProps) {
  const {
    onClick,
    children,
    style,
    isDisabled,
    className = '',
    type = ButtonType.Button,
    ['data-testid']: dataTestid,
  } = props;

  return (
    <button
      className={`button ${style} ${className}`}
      onClick={onClick}
      disabled={isDisabled}
      type={type}
      data-testid={dataTestid}
    >
      {children}
    </button>
  );
}
