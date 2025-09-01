import styles from './Pagination.module.css';
import { Button } from '../Button/Button.tsx';
import { ButtonStyle } from '../Button/Button.types.ts';
import IconNavigation from '../../../public/icons/dropdown.svg';
import { useTranslations } from 'next-intl';

export interface PaginationProps {
  activePage: number;
  totalPages?: number;
  previousPageClickHandler: () => void;
  nextPageClickHandler: () => void;
  isDisabled?: boolean;
}

export const Pagination = (props: PaginationProps) => {
  const { activePage, totalPages, previousPageClickHandler, nextPageClickHandler, isDisabled = false } = props;
  const isBtnToPreviousDisabled = activePage === 1 || !totalPages || activePage > totalPages || isDisabled;
  const isBtnToNextDisabled = activePage === totalPages || !totalPages || activePage > totalPages || isDisabled;
  const t = useTranslations('MainPage');

  const renderPaginationText = () => {
    return (
      <div>
        <span>{totalPages ? activePage : 0}</span>
        {t('paginationOf')}
        <span>{totalPages ? totalPages : 0}</span>
      </div>
    );
  };

  return (
    <div className={styles.pagination}>
      <Button
        className={styles.toPreviousPage}
        style={ButtonStyle.IconBtn}
        isDisabled={isBtnToPreviousDisabled}
        onClick={previousPageClickHandler}
      >
        <IconNavigation />
      </Button>
      {totalPages && totalPages >= activePage && renderPaginationText()}
      <Button
        className={styles.toNextPage}
        style={ButtonStyle.IconBtn}
        isDisabled={isBtnToNextDisabled}
        onClick={nextPageClickHandler}
      >
        <IconNavigation />
      </Button>
    </div>
  );
};
