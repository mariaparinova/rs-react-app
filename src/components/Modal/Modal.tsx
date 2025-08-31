import './Modal.css';
import type { KeyboardEventHandler } from 'react';
import type { ModalProps } from './Modal';
import { useEffect, useRef } from 'react';
import { Button, ButtonStyle } from '../Button/Button';
import IconClose from '../../icons/cross.svg?react';
import { ReactPortal } from '../ReactPortal/ReactPortal.tsx';

export function Modal(props: ModalProps) {
  const { children, isOpen, handleClose } = props;
  const modalRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previouslyFocusedElement = document.activeElement as HTMLElement | null;
    modalRef.current?.focus();

    return () => {
      previouslyFocusedElement?.focus();
    };
  }, [isOpen]);

  const onKeyTabHandler: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key !== 'Tab') {
      return;
    }

    const firstFocusableElement = modalRef.current?.querySelector('.first-focusable') as HTMLElement | null;
    const lastFocusableElement = modalRef.current?.querySelector('.last-focusable') as HTMLElement | null;

    if (!firstFocusableElement || !lastFocusableElement) {
      return;
    }

    if (event.shiftKey) {
      if (event.target === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
      }
    } else {
      if (event.target === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  const modalElement = (
    <>
      <div className="bg" onClick={handleClose}></div>
      <div className="modal" role="dialog" aria-modal="true" ref={modalRef} tabIndex={-1} onKeyDown={onKeyTabHandler}>
        <Button style={ButtonStyle.IconBtn} onClick={handleClose} className="close-btn first-focusable">
          <IconClose />
        </Button>
        {children}
      </div>
    </>
  );

  return <ReactPortal>{modalElement}</ReactPortal>;
}
