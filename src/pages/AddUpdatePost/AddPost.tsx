import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";

import styles from "./AddUpdatePost.module.scss";

import "easymde/dist/easymde.min.css";
import { IInfoPost, blogApi } from "../../redux";
import { useAppSelector } from "../../Hook/redux";
import Button, { EButtonColor } from "../../components/Button";
import { SERVER_URL } from "../../env";

const AddPost = () => {
  const { token } = useAppSelector((state) => state.slice.user);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IInfoPost>({
    defaultValues: {
      imageUrl: "",
      text: "",
      title: "",
      tags: [],
    },
    reValidateMode: "onBlur",
  });

  const [valText, setValText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const [uploadImage] = blogApi.useUploadImageMutation();
  const [addNewPost] = blogApi.useAddNewPostMutation();

  const handleChangeFile = async (
    e: React.FormEvent<HTMLInputElement>
  ): Promise<void> => {
    try {
      const formData = new FormData();
      if (e.currentTarget.files) {
        formData.append("image", e.currentTarget.files[0]);
      }
      const data = await uploadImage(formData).unwrap();
      setValue("imageUrl", data.url);
      setImageUrl(data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: IInfoPost): Promise<void> => {
    console.log(data);
    try {
      const newData = await addNewPost({
        token,
        infoPost: { ...data, text: valText },
      }).unwrap();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: "editor",
      },
    }),
    []
  );

  const onClickRemoveImage = (): void => {
    setImageUrl("");
    setValue("imageUrl", "");
  };

  const onChangeValText = React.useCallback(
    (value: string): void => setValText(value),
    []
  );

  return (
    <div className="container">
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <input
            ref={inputFileRef}
            onChange={handleChangeFile}
            type="file"
            hidden
          />
          <Button
            onClick={() => inputFileRef.current?.click()}
            color={EButtonColor.BORDER_BLUE}
          >
            Загрузить превью
          </Button>

          {imageUrl && (
            <>
              <Button onClick={onClickRemoveImage} color={EButtonColor.BLUE}>
                Удалить
              </Button>
              <img
                className={styles.preview}
                src={`${SERVER_URL}${imageUrl}`}
              />
            </>
          )}

          {errors.title && (
            <span className={styles.invalid_field}>
              {errors.title?.message}
            </span>
          )}
          <input
            {...register("title", {
              required: "Это обязательно поле",
            })}
            className={styles.input__title}
            type="text"
            placeholder="Заголовок статьи..."
          />
          <div className={styles.input__tags}>
            <input {...register("tags")} type="text" placeholder="Тэги" />
          </div>
        </div>

        <SimpleMDE
          className={styles.editor}
          id="editor"
          onChange={onChangeValText}
          value={valText}
          options={options}
        />
        <Button onClick={handleSubmit(onSubmit)} color={EButtonColor.BLUE}>Опубликовать</Button>
        <Link to="/">
          <Button color={EButtonColor.BORDER_BLUE}>Отмена</Button>
        </Link>
      </div>
    </div>
  );
};

export default AddPost;
