import './Button.module.css';
import { ButtonProps, ButtonType } from './Button.types.ts';
import clsx from 'clsx';
import styles from './Button.module.css';

export function Button(props: ButtonProps) {
  const { onClick, children, style, isDisabled, className = '', type = ButtonType.Button } = props;

  const classes = clsx(styles.button, styles[style], isDisabled && styles[`${style}Disabled`], className);

  return (
    <button className={classes} onClick={onClick} disabled={isDisabled} type={type}>
      {children}
    </button>
  );
}
