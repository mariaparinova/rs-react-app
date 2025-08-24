import { PropsWithChildren, ReactNode } from 'react';

export interface ModalProps extends PropsWithChildren {
  children: ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}
