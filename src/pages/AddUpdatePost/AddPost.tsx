import React from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';

import styles from './AddUpdatePost.module.scss';

import 'easymde/dist/easymde.min.css';
import { blogApi } from '../../redux/api';
import { useAppSelector } from '../../Hook/redux';
import Button, { EColor } from '../../components/Button';
import { isValidField } from '../../utils/isValidField';

const AddPost = () => {
  const { token } = useAppSelector((state) => state.slice.user);
  const navigate = useNavigate();

  const [valTitle, setValTitle] = React.useState('');
  const [valTags, setValTags] = React.useState('');
  const [valText, setValText] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const [invalidField, setInvalidField] = React.useState<string[]>();

  const [uploadImage] = blogApi.useUploadImageMutation();
  const [addNewPost, { isLoading }] = blogApi.useAddNewPostMutation();
  // const canSave = [valTitle, valText].every(Boolean) && !isLoading;

  const handleChangeFile = async (e: React.FormEvent<HTMLInputElement>): Promise<void> => {
    try {
      // специальный формат который позволит вшивать картинку и отправлять ее на бэк
      const formData = new FormData();
      if (e.currentTarget.files) {
        formData.append('image', e.currentTarget.files[0]);
      }
      const data = await uploadImage(formData).unwrap();
      console.log(data);
      setImageUrl(data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickCreatePost = async (): Promise<void> => {
    const infoPost = {
      title: valTitle,
      text: valText,
      tags: valTags.split(' '),
      imageUrl: imageUrl,
    };

    try {
      // ПОГУГЛИ ИПРАВИТЬ как я понимаю, если не сохранить данные, то реакт не находит их, 
      // и блок catch не выполнется, т е не приходит ответ а только ошибка
      // ваще не понял как это работает
      const data = await addNewPost({ token, infoPost }).unwrap();
      navigate('/');
    } catch (error) {
      setInvalidField([]);
      setInvalidField(isValidField(error));
      // console.error(err);
    }
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: 'editor',
      },
    }),
    [],
  );

  const onClickRemoveImage = (): void => setImageUrl('');

  const onChangeValText = React.useCallback((value: string): void => setValText(value), []);

  const onChangeTags = (e: React.ChangeEvent<HTMLInputElement>): void => setValTags(e.target.value);
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setValTitle(e.target.value);

  return (
    <div className="container">
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <input ref={inputFileRef} onChange={handleChangeFile} type="file" hidden />
          <div onClick={() => inputFileRef.current?.click()} className={styles.widthContent}>
            <Button color={EColor.BORDER_BLUE}>Загрузить превью</Button>
          </div>

          {imageUrl && (
            <div onClick={onClickRemoveImage}>
              <Button color={EColor.BLUE}>Удалить</Button>
            </div>
          )}
          {imageUrl && (
            <img className={styles.preview} src={`http://localhost:4444/${imageUrl}`}></img>
          )}

          {invalidField?.includes('title') ? (
            <span className={styles.invalid_field}>Минимум 3 символа</span>
          ) : (
            ''
          )}

          <input
            onChange={onChangeTitle}
            value={valTitle}
            className={styles.input__title}
            type="text"
            placeholder="Заголовок статьи..."
          />
          <div className={styles.input__tags}>
            <input onChange={onChangeTags} value={valTags} type="text" placeholder="Тэги" />
          </div>
        </div>

        {invalidField?.includes('text') ? (
          <span className={`${styles.invalid_field} ${styles.padding_left}`}>
            Минимум 10 символа
          </span>
        ) : (
          ''
        )}

        <SimpleMDE
          className={styles.editor}
          id="editor"
          onChange={onChangeValText}
          value={valText}
          options={options}
        />
        <div onClick={onClickCreatePost} className={styles.inline}>
          <Button color={EColor.BLUE}>Опубликовать</Button>
        </div>
        <Link to="/">
          <Button color={EColor.BORDER_BLUE}>Отмена</Button>
        </Link>
      </div>
    </div>
  );
};

export default AddPost;
