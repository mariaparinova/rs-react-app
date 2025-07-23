import './ContentContainer.css';
import { ContentContainerProps } from './ContentContainer.types.ts';

export function ContentContainer(props: ContentContainerProps) {
  const { children } = props;
  let { className = '' } = props;
  className = ` content-container ${className}`;

  return (
    <div className={className} data-testid="content-container">
      {children}
    </div>
  );
}
