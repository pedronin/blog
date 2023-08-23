import React from 'react';
import styles from './Loader.module.scss';

interface ILoader {
  backW?: boolean;
}

const Loader: React.FC<ILoader> = ({ backW }) => {
  if (backW) {
    return (
      <div className={`${styles.loader__container} ${styles.loader__container_white}`}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.loader__container}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loader;
