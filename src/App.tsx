import './App.css';
import { useMemo, useState } from 'react';
import { Modal } from './components/Modal/Modal.tsx';
import { Card } from './components/Card/Card.tsx';
import { Button, ButtonStyle } from './components/Button/Button.tsx';
import { useUserStore } from './store/user/userStore.ts';
import { UncontrolledUserForm } from './components/forms/userData/UncontrolledUserForm/UncontrolledUserForm.tsx';
import { ControlledUserForm } from './components/forms/userData/ControlledUserForm/ControlledUserForm.tsx';
import { User } from './types/user.ts';
import { InitUserFormData } from './components/forms/userData/userFormSchema.ts';

enum FormType {
  Uncontrolled = 'uncontrolled',
  Controlled = 'controlled',
}

export function App() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useUserStore();
  const [currentFormType, setCurrentFormType] = useState<FormType | undefined>(undefined);
  const [lastUpdatedByFormType, setLastUpdatedByFormType] = useState<FormType | undefined>(undefined);

  const closeForm = (params: { user: User }) => {
    const { user } = params;
    setUser({ user });

    setTimeout(() => setIsOpen(false), 500);

    const changingByFormType = currentFormType === FormType.Uncontrolled ? FormType.Uncontrolled : FormType.Controlled;
    setLastUpdatedByFormType(changingByFormType);
  };

  const initFormData: InitUserFormData | undefined = useMemo(() => {
    if (!user) {
      return;
    }

    return {
      name: user.name,
      age: user.age,
      email: user.email,
      password: user.password,
      confirmPassword: user.password,
      gender: user.gender,
      country: user.country,
    };
  }, [user]);

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
          <UncontrolledUserForm initFormData={initFormData} submitHandler={closeForm} />
        ) : (
          <ControlledUserForm initFormData={initFormData} submitHandler={closeForm} />
        )}
      </Modal>
    </div>
  );
}
