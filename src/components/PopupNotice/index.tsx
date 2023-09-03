import React from 'react';

import styles from './PopupТotice.module.scss';
import { useAppDispatch, useAppSelector } from '../../Hook/redux';
import { setFirstLaunch } from '../../redux/slice';
import Button, { EColor } from '../Button';

const PopupNotice: React.FC = () => {
  const dispatch = useAppDispatch();
  const firstLaunch = useAppSelector((state) => state.slice.firstLaunch);

  const onClickClose = () => dispatch(setFirstLaunch());

  return (
    <div className={`${styles.root} ${!firstLaunch ? styles.hidden : ''}`}>
      <h2>Первая загрузка может занять некоторое время. (около 1 минуты)</h2>
      <div onClick={onClickClose}>
        <Button color={EColor.BORDER_BLUE}>Закрыть</Button>
      </div>
    </div>
  );
};

export default PopupNotice;
