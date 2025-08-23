import './Card.css';
import type { CardProps } from './Card.ts';

export function Card(props: CardProps) {
  const { user, className = '' } = props;
  return (
    <div className={`card ${className}`}>
      <div className="card-item">
        <h4>Name:</h4>
        <span className="text-content"> {user?.name}</span>
      </div>
      <div className="card-item">
        <h4>Age:</h4>
        <span className="text-content"> {user?.age}</span>
      </div>
      <div className="card-item">
        <h4>Email:</h4>
        <span className="text-content"> {user?.email}</span>
      </div>
      <div className="card-item">
        <h4>Password:</h4>
        <span className="text-content"> {user?.password}</span>
      </div>
      <div className="card-item">
        <h4>Gender:</h4>
        <span className="text-content"> {user?.gender}</span>
      </div>
      <div className="card-item">
        <h4>Country:</h4>
        <span className="text-content"> {user?.country}</span>
      </div>
      <div className="card-item">
        <h4>Picture:</h4>
      </div>
    </div>
  );
}
