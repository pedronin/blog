import React from 'react';

import styles from './Button.module.scss';

export enum EColor {
  BLUE = 'blue',
  RED = 'red',
  BORDER_BLUE = 'border__blue',
}

interface IButton {
  color: EColor;
  children: string;
}

const Button: React.FC<IButton> = ({ color, children }) => {
  return (
    <button
      className={`${styles.button} ${
        color === EColor.BLUE
          ? styles.blue
          : color === EColor.RED
          ? styles.red
          : styles.border__blue
      }`}>
      {children}
    </button>
  );
};

export default Button;
