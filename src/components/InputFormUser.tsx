import React from "react";
import { UseFormRegister } from "react-hook-form";
import styles from "./Form.module.scss";
import { LoginUserMutate, NewUserMutate } from "../redux";

const placeholders = {
  email: "E-Mail",
  fullName: "Имя",
  password: "Пороль",
};

interface InputFormUserProps {
  errorMessage?: String;
  register: UseFormRegister<NewUserMutate> | UseFormRegister<LoginUserMutate>;
  nameInput: "fullName" | "email" | "password";
}

export const InputFormUser: React.FC<InputFormUserProps> = ({
  errorMessage,
  register,
  nameInput,
}) => {
  return (
    <>
      {errorMessage && (
        <span className={styles.invalid_field}>{errorMessage}</span>
      )}
      <div className={styles.form__row}>
        <input
          // @ts-ignore
          {...register(nameInput, {
            required: "Это обязательное поле",
          })}
          className={styles.form__input}
          required
        />
        <label className={styles.form__label}>{placeholders[nameInput]}</label>
      </div>
    </>
  );
};
