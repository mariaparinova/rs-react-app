'use client';

import styles from './TopControls.module.css';
import { ChangeEvent, FormEventHandler, useState } from 'react';
import { InputSearch } from '../../../inputs/InputSearch/InputSearch.tsx';
import { Button } from '../../../Button/Button.tsx';
import { TopControlsProps } from './TopControls.types.ts';
import { ButtonStyle, ButtonType } from '../../../Button/Button.types.ts';
import { useTranslations } from 'next-intl';

export default function TopControls({ isLoading, onSearchTermChange, initialSearchTerm }: TopControlsProps) {
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);

  const handleBtnClick: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSearchTermChange(searchTerm);
  };

  const handleInputChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const t = useTranslations('MainPage');

  return (
    <form className={styles.topControls} onSubmit={handleBtnClick}>
      <InputSearch
        id="search-input"
        placeholder={t('placeholder')}
        value={searchTerm}
        isDisabled={isLoading}
        onChange={handleInputChanges}
      />
      <Button style={ButtonStyle.Primary} isDisabled={isLoading} type={ButtonType.Submit}>
        {t('search')}
      </Button>
    </form>
  );
}
