import React from "react";
import styles from "./Button.module.scss";
export enum EButtonColor {
  BLUE = "blue",
  RED = "red",
  BORDER_BLUE = "border__blue",
}

interface IButtonProps {
  color: EButtonColor;
  children: string;
  onClick?: () => void;
}

const Button: React.FC<IButtonProps> = ({ color, children, ...props }) => {
  return (
    <button
      {...props}
      className={`${styles.button} ${
        color === EButtonColor.BLUE
          ? styles.blue
          : color === EButtonColor.RED
          ? styles.red
          : styles.border__blue
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
