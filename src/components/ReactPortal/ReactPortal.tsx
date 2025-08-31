import { createPortal } from 'react-dom';
import type { ReactPortalProps } from './ReactPortal.ts';

export function ReactPortal(props: ReactPortalProps) {
  const { children, containerId = 'portal-root' } = props;
  let portalRoot = document.getElementById(containerId);

  if (!portalRoot) {
    portalRoot = document.createElement('div');
    portalRoot.id = containerId;
    document.body.append(portalRoot);
  }

  return createPortal(children, portalRoot);
}
