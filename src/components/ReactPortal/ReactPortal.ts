import { PropsWithChildren, ReactNode } from 'react';

export interface ReactPortalProps extends PropsWithChildren {
  children: ReactNode;
  containerId?: string;
}
