import './Header.css';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../router/routes.ts';

export function Header() {
  return (
    <header className="header" data-testid="header">
      <Link to={ROUTES.ROOT}>PETS</Link>
      <Link to={ROUTES.ABOUT}>ABOUT</Link>
    </header>
  );
}
