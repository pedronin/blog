import React from 'react';
import styles from './Loader.module.scss';

interface ILoaderProps {
  backW?: boolean;
  widthContent?: boolean;
}

const Loader: React.FC<ILoaderProps> = ({ backW, widthContent }) => {
  return (
    <>
      <div
        className={`${styles.loader__container} ${backW && styles.loader__container_white} ${
          widthContent && styles.loader__container_width
        }`}>
        <div className={styles.spinner}></div>
      </div>
    </>
  );
};

export default Loader;
