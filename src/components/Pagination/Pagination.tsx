import './Pagination.css';
import IconDropdown from '../../icons/dropdown.svg?react';
import { Button } from '../Button/Button.tsx';
import { ButtonStyle } from '../Button/Button.types.ts';

export interface PaginationProps {
  activePage: number;
  totalPages?: number;
  previousPageClickHandler: () => void;
  nextPageClickHandler: () => void;
  isDisabled?: boolean;
}

export const Pagination = (props: PaginationProps) => {
  const { activePage, totalPages, previousPageClickHandler, nextPageClickHandler, isDisabled = false } = props;

  const renderPaginationText = () => {
    return (
      <div className="pagination-content font-xs">
        <span data-testid="active-page">{totalPages ? activePage : 0}</span>
        of
        <span data-testid="total-pages">{totalPages ? totalPages : 0}</span>
      </div>
    );
  };

  return (
    <div className="pagination" data-testid="pagination">
      <Button
        className="to-previous-page"
        style={ButtonStyle.IconBtn}
        isDisabled={activePage === 1 || !totalPages || activePage > totalPages || isDisabled}
        onClick={previousPageClickHandler}
        data-testid="to-previous"
      >
        <IconDropdown />
      </Button>
      {totalPages && totalPages >= activePage && renderPaginationText()}
      <Button
        className="to-next-page"
        style={ButtonStyle.IconBtn}
        isDisabled={activePage === totalPages || !totalPages || activePage > totalPages || isDisabled}
        onClick={nextPageClickHandler}
        data-testid="to-next"
      >
        <IconDropdown />
      </Button>
    </div>
  );
};
