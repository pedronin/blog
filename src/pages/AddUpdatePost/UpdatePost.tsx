import React from "react";
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
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.slice.user);
  const { id } = useParams();

  const [valText, setValText] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const [uploadImage] = blogApi.useUploadImageMutation();
  const [updatePost] = blogApi.useUpdatePostMutation();

  const { data } = blogApi.useGetOnePostQuery(id || "");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IInfoPost>({
    defaultValues: {
      imageUrl: "",
      text: "",
      title: "",
      tags: "",
    },
    reValidateMode: "onBlur",
  });

  React.useEffect(() => {
    if (data) {
      setValText(data.text);
      setImageUrl(data.imageUrl || "");
      setValue("title", data.title);
      // Ошибка
      setValue("tags", data.tags.join(" "));
    }
  }, [data]);

  const onSubmit = async (data: IInfoPost): Promise<void> => {
    if (!id) {
      return;
    }

    try {
      const newData = await updatePost({
        _id: id,
        token,
        infoPost: { ...data, text: valText },
      }).unwrap();
      reset();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeFile = async (
    e: React.FormEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();
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

  const onChangeValText = React.useCallback(
    (value: string) => setValText(value),
    []
  );

  const onClickRemoveImage = () => {
    setImageUrl("");
    setValue("imageUrl", "");
  };

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

          <Button onClick={() => inputFileRef.current?.click()} color={EButtonColor.BORDER_BLUE}>Загрузить превью</Button>

          {imageUrl && (
            <Button onClick={onClickRemoveImage} color={EButtonColor.BLUE}>Удалить</Button>
          )}
          {imageUrl && (
            <img
              className={styles.preview}
              src={`${SERVER_URL}${imageUrl}`}
            ></img>
          )}
          {errors.title && (
            <span className={styles.invalid_field}>
              {errors.title?.message}
            </span>
          )}
          <input
            {...register("title", {
              required: "Это поле обязательно",
            })}
            className={styles.input__title}
            type="text"
            placeholder="Заголовок статьи..."
          />
          <div className={styles.input__tags}>
            <input {...register("tags")} type="text" placeholder="Тэги" />
          </div>
        </div>
        {errors.text && (
          <span className={styles.invalid_field}>{errors.text?.message}</span>
        )}
        <SimpleMDE
          className={styles.editor}
          id="editor"
          onChange={onChangeValText}
          value={valText}
          options={options}
        />
        <Button onClick={handleSubmit(onSubmit)} color={EButtonColor.BLUE}>Сохранить</Button>
        <Link to="/">
          <Button color={EButtonColor.BORDER_BLUE}>Отмена</Button>
        </Link>
      </div>
    </div>
  );
};

export default AddPost;
