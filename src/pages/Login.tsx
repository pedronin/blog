import React from "react";
import { useForm } from "react-hook-form";
import styles from "../components/Form.module.scss";
import { useAppDispatch, useAppSelector } from "../Hook/redux";
import { LoginUserMutate, blogApi, setUser } from "../redux";
import { useNavigate } from "react-router-dom";
import { InputFormUser } from "../components/InputFormUser";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserMutate>({
    defaultValues: {
      email: "",
      password: "",
    },
    reValidateMode: "onBlur",
  });

  const user = useAppSelector((state) => state.slice.user);
  const [loginUser] = blogApi.useLoginUserMutation();

  const onSubmit = async (data: LoginUserMutate) => {
    console.log(data);
    try {
      const newData = await loginUser(data).unwrap();
      dispatch(setUser(newData));
      navigate("/");
    } catch (err: any) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <div className="container">
      <div className={styles.root}>
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <h4 className={styles.title}>Вход в аккаунт</h4>
          {errors.email && (
            <span className={styles.invalid_field}>
              {errors.email?.message}
            </span>
          )}
          
          <InputFormUser
            errorMessage={errors.email?.message}
            register={register}
            nameInput={"email"}
          />
          <InputFormUser
            errorMessage={errors.password?.message}
            register={register}
            nameInput={"password"}
          />
          <button className={styles.form__submit}>Войти</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
