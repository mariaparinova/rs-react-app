import './App.css';
import { useState } from 'react';
import { Modal } from './components/Modal/Modal.tsx';
import { Card } from './components/Card/Card.tsx';
import { Button, ButtonStyle } from './components/Button/Button.tsx';
import { useUserStore } from './store/user/userStore.ts';
import { UncontrolledUserForm } from './components/forms/userData/UncontrolledUserForm/UncontrolledUserForm.tsx';
import { ControlledUserForm } from './components/forms/userData/ControlledUserForm/ControlledUserForm.tsx';

enum FormType {
  Uncontrolled = 'uncontrolled',
  Controlled = 'controlled',
}

export function App() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUserStore();
  const [currentFormType, setCurrentFormType] = useState<FormType | undefined>(undefined);
  const [lastUpdatedByFormType, setLastUpdatedByFormType] = useState<FormType | undefined>(undefined);

  const closeForm = () => {
    setTimeout(() => setIsOpen(false), 500);
    const changingByFormType = currentFormType === FormType.Uncontrolled ? FormType.Uncontrolled : FormType.Controlled;
    setLastUpdatedByFormType(changingByFormType);
  };

  return (
    <div className="app">
      <div className="content-container">
        <div className="content-item">
          <Card className={lastUpdatedByFormType} user={user} />
          <Button
            style={ButtonStyle.Secondary}
            onClick={() => {
              setIsOpen(true);
              setCurrentFormType(FormType.Uncontrolled);
            }}
          >
            open uncontrolled form
          </Button>
          <Button
            style={ButtonStyle.Secondary}
            onClick={() => {
              setIsOpen(true);
              setCurrentFormType(FormType.Controlled);
            }}
          >
            open controlled form
          </Button>
        </div>
      </div>
      <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
        {currentFormType === FormType.Uncontrolled ? (
          <UncontrolledUserForm handleSubmit={closeForm} />
        ) : (
          <ControlledUserForm onSubmitHandler={closeForm} />
        )}
      </Modal>
    </div>
  );
}
