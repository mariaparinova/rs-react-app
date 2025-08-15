import { Link } from 'i18n/navigation';

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="content-container">
        <h1>Not Found</h1>
        <div>This page doesn’t exist</div>
        <Link href="/">to main page</Link>
      </div>
    </div>
  );
}
