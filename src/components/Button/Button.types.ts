import { MouseEventHandler, ReactNode } from 'react';

export enum ButtonStyle {
  Primary = 'primary',
  Secondary = 'secondary',
  IconBtn = 'iconBtn',
}

export enum ButtonType {
  Button = 'button',
  Submit = 'submit',
  Reset = 'reset',
}

export interface ButtonProps {
  children: ReactNode;
  style: ButtonStyle;
  isDisabled: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: ButtonType;
}
