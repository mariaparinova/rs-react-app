import './ContentContainer.css';
import { Component, ReactNode } from 'react';

interface ContentContainerProps {
  children: ReactNode;
  className?: string;
}

export class ContentContainer extends Component<ContentContainerProps> {
  render() {
    const { children } = this.props;

    let { className = '' } = this.props;
    className = ` content-container ${className}`;

    return (
      <div className={className} data-testid="content-container">
        {children}
      </div>
    );
  }
}
