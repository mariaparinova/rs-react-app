import './NotFoundPage.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button.tsx';
import { ButtonStyle } from '../../components/Button/Button.types.ts';
import IconLion from '../../icons/lion.svg?react';
import { ROUTES } from '../../router/routes.ts';
import { Theme, THEME_KEY } from '../../context/Theme.context.ts';
import { useEffect } from 'react';

export function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.className = localStorage.getItem(THEME_KEY) || Theme.Light;
  });

  return (
    <div className="not-found-page">
      <div className="content-container">
        <h1>Not Found</h1>
        <div>This page doesn’t exist</div>
        <IconLion />
        <Button style={ButtonStyle.Primary} isDisabled={false} onClick={() => navigate(ROUTES.ROOT)}>
          to main page
        </Button>
      </div>
    </div>
  );
}
