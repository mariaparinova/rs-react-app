import './Button.css';
import { Component, MouseEventHandler, ReactNode } from 'react';

export enum ButtonStyle {
  Primary = 'primary',
  Secondary = 'secondary',
}

export enum ButtonType {
  Button = 'button',
  Submit = 'submit',
  Reset = 'reset',
}

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  style: ButtonStyle;
  isDisabled: boolean;
  className?: string;
  type?: ButtonType;
}

export class Button extends Component<ButtonProps> {
  render() {
    const { onClick, children, style, isDisabled, className = '', type = ButtonType.Button } = this.props;

    return (
      <button className={`button ${style} ${className}`} onClick={onClick} disabled={isDisabled} type={type}>
        {children}
      </button>
    );
  }
}
