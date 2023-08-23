import React from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';

import styles from './AddPost.module.scss';
import 'easymde/dist/easymde.min.css';
import { blogApi } from '../../redux/api';
import { useAppSelector } from '../../Hook/redux';
import Button, { EColor } from '../../components/Button';

const AddPost = () => {
  const { token } = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  const [valTitle, setValTitle] = React.useState('');
  const [valTags, setValTags] = React.useState('');
  const [valText, setValText] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');

  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const [uploadImage] = blogApi.useUploadImageMutation();
  const [addNewPost, { isLoading }] = blogApi.useAddNewPostMutation();
  const canSave = [valTitle, valText].every(Boolean) && !isLoading;

  const handleChangeFile = async (e: React.FormEvent<HTMLInputElement>) => {
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

  const onClickRemoveImage = async () => {
    setImageUrl('');
  };

  const onChangeSetValTitle = React.useCallback((value: string) => {
    setValText(value);
  }, []);

  const onClickCreatePost = async () => {
    if (canSave) {
      const infoPost = {
        title: valTitle,
        text: valText,
        tags: valTags.split(' '),
        imageUrl: imageUrl,
      };

      try {
        await addNewPost({ token, infoPost }).unwrap();
        setValTitle('');
        setValTags('');
        setValText('');
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    } else {
      alert('Заполните поля заголовка текст');
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

  return (
    <div className="container">
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <input ref={inputFileRef} onChange={handleChangeFile} type="file" hidden />
          {/* <button onClick={() => inputFileRef.current?.click()} className={styles.button__download}>
            Загрузить превью
          </button> */}
          <div onClick={() => inputFileRef.current?.click()} className={styles.widthContent}>
            <Button color={EColor.BORDER_BLUE}>Загрузить превью</Button>
          </div>

          {imageUrl && <button onClick={onClickRemoveImage}>Удалить</button>}
          {imageUrl && (
            <img className={styles.preview} src={`http://localhost:4444/${imageUrl}`}></img>
          )}
          <input
            onChange={(e) => setValTitle(e.target.value)}
            value={valTitle}
            className={styles.input__title}
            type="text"
            placeholder="Заголовок статьи..."
          />
          <div className={styles.input__tags}>
            <input
              onChange={(e) => setValTags(e.target.value)}
              value={valTags}
              type="text"
              placeholder="Тэги"
            />
          </div>
        </div>

        <SimpleMDE
          className={styles.editor}
          id="editor"
          onChange={onChangeSetValTitle}
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