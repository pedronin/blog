import React, { forwardRef } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import styles from "./Form.module.scss";
import { LoginUserMutate, NewUserMutate } from "../redux";

const placeholders = {
  email: "E-Mail",
  fullName: "Имя",
  password: "Пороль",
};

interface InputFormUserProps {
  // errorMessage?: String;
  nameInput: "fullName" | "email" | "password";
  error?: FieldError;
}

// export const InputFormUser: React.FC<InputFormUserProps> = ({
//   error,
//   nameInput,
//   ...rest
// }) => {
//   return (
//     <>
//       {error && (
//         <span className={styles.invalid_field}>{error.message}</span>
//       )}
//       <div className={styles.form__row}>
//         <input
//           {...rest}
//           className={styles.form__input}
//           // required
//         />
//         <label className={styles.form__label}>{placeholders[nameInput]}</label>
//       </div>
//     </>
//   );
// };
export const InputFormUser = forwardRef<HTMLInputElement, InputFormUserProps>(
  ({ error, nameInput, ...rest }, ref) => {
    return (
      <>
        {error && <span className={styles.invalid_field}>{error.message}</span>}
        <div className={styles.form__row}>
          <input
            ref={ref}
            {...rest}
            className={styles.form__input}
            // required
          />
          <label className={styles.form__label}>
            {placeholders[nameInput]}
          </label>
        </div>
      </>
    );
  }
);
