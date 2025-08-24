import './Button.css';
import { Component, MouseEventHandler, ReactNode } from 'react';

export enum ButtonStyle {
  Primary = 'primary',
  Secondary = 'secondary',
  IconBtn = 'icon-btn',
}

export enum ButtonType {
  Button = 'button',
  Submit = 'submit',
  Reset = 'reset',
}

interface ButtonProps {
  children: ReactNode;
  style: ButtonStyle;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
  className?: string;
  type?: ButtonType;
}

export class Button extends Component<ButtonProps> {
  render() {
    const { onClick, children, style, isDisabled = false, className = '', type = ButtonType.Button } = this.props;

    return (
      <button className={`button ${style} ${className}`} onClick={onClick} disabled={isDisabled} type={type}>
        {children}
      </button>
    );
  }
}
