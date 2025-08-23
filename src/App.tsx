import './App.css';
import { useState } from 'react';
import { Modal } from './components/Modal/Modal.tsx';
import { Card } from './components/Card/Card.tsx';
import { Button, ButtonStyle } from './components/Button/Button.tsx';
import { useUserStore } from './store/user/userStore.ts';
import { FormType } from './store/user/userStore.types.ts';
import { UncontrolledUserForm } from './components/forms/userData/UncontrolledUserForm/UncontrolledUserForm.tsx';
import { ControlledUserForm } from './components/forms/userData/ControlledUserForm/ControlledUserForm.tsx';

export function App() {
  const [isOpen, setIsOpen] = useState(false);
  const { userByUncontrolledForm, userByControlledForm } = useUserStore();
  const [currentFormType, setCurrentFormType] = useState<FormType | undefined>(undefined);

  return (
    <div className="app">
      <div className="content-container">
        <div className="content-item uncontrolled">
          <Card user={userByUncontrolledForm}></Card>
          <Button
            style={ButtonStyle.Secondary}
            onClick={() => {
              setIsOpen(true);
              setCurrentFormType(FormType.Uncontrolled);
            }}
          >
            open uncontrolled form
          </Button>
        </div>
        <div className="content-item controlled">
          <Card user={userByControlledForm}></Card>
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
        {currentFormType === FormType.Uncontrolled ? <UncontrolledUserForm /> : <ControlledUserForm />}
      </Modal>
    </div>
  );
}
