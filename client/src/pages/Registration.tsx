import React from "react";
import { useForm } from "react-hook-form";

import styles from "../components/Form.module.scss";
import { NewUserMutate, blogApi, setUser } from "../redux";
import { useAppDispatch, useAppSelector } from "../Hook/redux";
import { useNavigate } from "react-router-dom";

import userAvatarImg from "../assets/img/user-avatar.png";
import cameraImg from "../assets/img/camera.svg";
import PopupAvatar from "../components/PopupAvatar";
import { SERVER_URL } from "../env";
import { InputFormUser } from "../components/InputFormUser";

const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = React.useState("");
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const user = useAppSelector((state) => state.slice.user);
  const [newUser] = blogApi.useNewUserMutation();
  const [uploadImage] = blogApi.useUploadImageMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<NewUserMutate>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      avatarUrl: "",
    },
    reValidateMode: "onBlur",
  });

  const onSubmit = async (data: NewUserMutate) => {
    try {
      const newData = await newUser(data).unwrap();
      dispatch(setUser(newData));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeFile = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (e.currentTarget.files) {
        formData.append("image", e.currentTarget.files[0]);
      }
      const data = await uploadImage(formData).unwrap();
      setAvatarUrl(data.url);
      setValue("avatarUrl", data.url);
    } catch (err) {
      alert("Ошибка при загрузке аватарки");
      console.error(err);
    }
  };

  const onChangeAvatarUrl = (url: string): void => {
    setAvatarUrl(url);
    setValue("avatarUrl", url);
  };

  React.useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <div className="container">
      <div className={styles.root}>
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <h4 className={styles.title}>Создание аккаунта</h4>
          <div
            onClick={() => inputFileRef.current?.click()}
            className={styles.avatar}
          >
            <img
              src={avatarUrl ? `${SERVER_URL}${avatarUrl}` : userAvatarImg}
              alt=""
            />
            <div className={styles.avatar_camera}>
              <img src={cameraImg} alt="" />
            </div>
          </div>
          <PopupAvatar onChangeAvatarUrl={onChangeAvatarUrl} />
          <input
            ref={inputFileRef}
            onChange={handleChangeFile}
            type="file"
            hidden
          />
          <InputFormUser
            error={errors.fullName}
            nameInput={"fullName"}
            {...register("fullName", {
              minLength: {
                value: 3,
                message: "Min length 3 symbols!",
              },
              required: true,
            })}
          />
          <InputFormUser
            error={errors.email}
            nameInput={"email"}
            {...register("email", {
              required: "required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Not valid email!",
              },
            })}
          />
          <InputFormUser
            error={errors.password}
            nameInput={"password"}
            {...register("password", {
              minLength: {
                value: 5,
                message: "Min length 5 symbols!",
              },
              required: true,
            })}
          />
          <button className={styles.form__submit}>Зарегистрироваться</button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
