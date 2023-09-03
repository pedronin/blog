import React from 'react';
import styles from './Loader.module.scss';
import PopupNotice from '../PopupNotice';

interface ILoader {
  backW?: boolean;
  widthContent?: boolean;
}

const Loader: React.FC<ILoader> = ({ backW, widthContent }) => {
  return (
    <>
      <PopupNotice />
      <div
        className={`${styles.loader__container} ${backW ? styles.loader__container_white : ''} ${
          widthContent ? styles.loader__container_width : ''
        }`}>
        <div className={styles.spinner}></div>
      </div>
    </>
  );
};

export default Loader;