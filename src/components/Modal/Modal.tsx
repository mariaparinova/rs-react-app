import './Modal.css';
import { useEffect } from 'react';
import type { ModalProps } from './Modal';
import { Button, ButtonStyle } from '../Button/Button';
import IconClose from '../../icons/cross.svg?react';
import { ReactPortal } from '../ReactPortal/ReactPortal.tsx';

export function Modal(props: ModalProps) {
  const { children, isOpen, handleClose } = props;

  useEffect(() => {
    const closeOnEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.body.addEventListener('keydown', closeOnEscapeKey);

    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) {
    return null;
  }

  const modalElement = (
    <>
      <div className="bg" onClick={handleClose}></div>
      <div className="modal" role="dialog" aria-modal="true">
        <Button style={ButtonStyle.IconBtn} onClick={handleClose} className="close-btn">
          <IconClose />
        </Button>
        {children}
      </div>
    </>
  );

  return <ReactPortal>{modalElement}</ReactPortal>;
}
