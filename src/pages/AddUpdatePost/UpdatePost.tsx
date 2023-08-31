import React from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';

import styles from './AddUpdatePost.module.scss';

import 'easymde/dist/easymde.min.css';
import { blogApi } from '../../redux/api';
import { useAppSelector } from '../../Hook/redux';
import Button, { EColor } from '../../components/Button';
import Loader from '../../components/Loader';
import { isValidField } from '../../utils/isValidField';

const AddPost = () => {
  const { token } = useAppSelector((state) => state.slice.user);
  const navigate = useNavigate();
  const { id } = useParams();

  const [valTitle, setValTitle] = React.useState('');
  const [valTags, setValTags] = React.useState('');
  const [valText, setValText] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const [invalidField, setInvalidField] = React.useState<string[]>();

  const [uploadImage] = blogApi.useUploadImageMutation();
  const [updatePost] = blogApi.useUpdatePostMutation();

  // ПОГУГЛИ ИСПРАВИТЬ. Не правильно понимаю, но как сделать правильно - не знаю
  const { data } = blogApi.useGetOnePostQuery(id || '');

  React.useEffect(() => {
    if (data) {
      setValTitle(data.title);
      setValTags(data.tags.join(' '));
      setValText(data.text);
      setImageUrl(data.imageUrl || '');
    }
  }, [data]);

  const onClickUpdatePost = async (): Promise<void> => {
    if (!id) {
      return;
    }

    const infoPost = {
      title: valTitle,
      text: valText,
      tags: valTags.split(' '),
      imageUrl: imageUrl,
    };

    try {
      const data = await updatePost({ _id: id, token, infoPost }).unwrap();
      navigate('/');
    } catch (error) {
      // console.log(error);
      setInvalidField([]);
      setInvalidField(isValidField(error));
    }
  };

  const handleChangeFile = async (e: React.FormEvent<HTMLInputElement>): Promise<void> => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (e.currentTarget.files) {
        formData.append('image', e.currentTarget.files[0]);
      }
      const data = await uploadImage(formData).unwrap();
      setImageUrl(data.url);
    } catch (error) {
      console.log(error);
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

  const onChangeValText = React.useCallback((value: string): void => setValText(value), []);

  const onClickRemoveImage = (): void => setImageUrl('');

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
            <img className={styles.preview} src={`https://blog-ys3l.onrender.com/${imageUrl}`}></img>
          )}
          {invalidField?.includes('title') ? (
            <span className={styles.invalid_field}>
              Минимум 3 символа
            </span>
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
        <div onClick={onClickUpdatePost} className={styles.inline}>
          <Button color={EColor.BLUE}>Сохранить</Button>
        </div>
        <Link to="/">
          <Button color={EColor.BORDER_BLUE}>Отмена</Button>
        </Link>
      </div>
    </div>
  );
};

export default AddPost;
