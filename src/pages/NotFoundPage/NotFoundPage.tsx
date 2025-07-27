import './NotFoundPage.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button.tsx';
import { ButtonStyle } from '../../components/Button/Button.types.ts';
import IconLion from '../../icons/lion.svg?react';
import { ROUTES } from '../../router/routes.ts';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <h1>404</h1>
      <div>page not found</div>
      <IconLion />
      <Button style={ButtonStyle.Primary} isDisabled={false} onClick={() => navigate(ROUTES.ROOT)}>
        to main page
      </Button>
    </div>
  );
}
