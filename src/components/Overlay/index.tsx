import React from 'react';

import styles from './Overlay.module.scss'

interface IOverlay {
    show: Boolean,
    hidden: Boolean,
}

const Overlay: React.FC<IOverlay> = ({ show, hidden }) => {
  return (
    <div className={`${styles.overlay} ${show ? styles.show : ''} ${hidden ? styles.hidden : ''}`}>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
    </div>
  );
};

export default Overlay;
