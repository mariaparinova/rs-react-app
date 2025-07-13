import './ContentContainer.css';
import { Component, ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
  className?: string;
}

export class ContentContainer extends Component<MainProps> {
  render() {
    const { children } = this.props;

    let { className } = this.props;
    className = `content-container ${className || ''}`;

    return <div className={className}>{children}</div>;
  }
}
