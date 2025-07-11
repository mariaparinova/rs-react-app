import { Component, ReactNode } from 'react';

export enum ButtonStyle {
  Primary = 'primary',
  Secondary = 'secondary',
}

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  style?: ButtonStyle;
  isDisabled?: boolean;
}

const commonBtnClassName = 'pt-1 pb-1 pl-4 pr-4 rounded-sm';
const primaryBtnClassName = ' bg-lime-300';
const secondaryBtnClassName = ' border-2 border-lime-300';

export class Button extends Component<ButtonProps> {
  render() {
    const { onClick, children, style = ButtonStyle.Primary, isDisabled } = this.props;

    const className =
      style === ButtonStyle.Primary
        ? commonBtnClassName + primaryBtnClassName
        : commonBtnClassName + secondaryBtnClassName;

    return (
      <button className={className} onClick={onClick} disabled={isDisabled}>
        {children}
      </button>
    );
  }
}
