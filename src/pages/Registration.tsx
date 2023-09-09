import React from 'react';

import styles from '../components/Form.module.scss';
import { blogApi } from '../redux/api';
import { setUser } from '../redux/slice';
import { useAppDispatch, useAppSelector } from '../Hook/redux';
import { useNavigate } from 'react-router-dom';

import userAvatarImg from '../assets/img/user-avatar.png';
import cameraImg from '../assets/img/camera.svg';
import PopupAvatar from '../components/PopupAvatar';
import { isValidField } from '../utils/isValidField';

const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [invalidField, setInvalidField] = React.useState<string[]>();

  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const user = useAppSelector((state) => state.slice.user);
  const [newUser] = blogApi.useNewUserMutation();
  const [uploadImage] = blogApi.useUploadImageMutation();

  const onClickCreateUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const obj = {
      fullName,
      email,
      password,
      avatarUrl,
    };

    try {
      setInvalidField([])
      const data = await newUser(obj).unwrap();
      setFullName('');
      setEmail('');
      setPassword('');
      setAvatarUrl('');
      dispatch(setUser(data));
      navigate('/');
    } catch (err) {
      setInvalidField([])
      setInvalidField(isValidField(err));
    }
  };

  const handleChangeFile = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (e.currentTarget.files) {
        formData.append('image', e.currentTarget.files[0]);
      }
      const data = await uploadImage(formData).unwrap();
      console.log(data.url);
      setAvatarUrl(data.url);
    } catch (err) {
      alert('Ошибка при загрузке аватарки');
      console.error(err);
    }
  };

  const onChangeAvatarUrl = (url: string): void => {
    setAvatarUrl(url);
  };

  React.useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const onChangeMail = (e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value);
  const onChangePass = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setPassword(e.target.value);
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setFullName(e.target.value);

  return (
    <div className="container">
      <div className={styles.root}>
        <form action="">
          <h4 className={styles.title}>Создание аккаунта</h4>
          <div onClick={() => inputFileRef.current?.click()} className={styles.avatar}>
          <img src={avatarUrl ? `https://pedronin.ru/${avatarUrl}` : userAvatarImg} alt="" />
            <div className={styles.avatar_camera}>
              <img src={cameraImg} alt="" />
            </div>
          </div>
          <PopupAvatar onChangeAvatarUrl={onChangeAvatarUrl} />
          <input ref={inputFileRef} onChange={handleChangeFile} type="file" hidden />

          {invalidField?.includes('fullName') ? (
            <span className={styles.invalid_field}>Минимум 3 символа</span>
          ) : (
            ''
          )}

          <div className={styles.form__row}>
            <input
              onChange={onChangeName}
              value={fullName}
              className={styles.form__input}
              required
            />
            <label className={styles.form__label}>Полное имя</label>
          </div>

          {invalidField?.includes('email') ? (
            <span className={styles.invalid_field}>Не валидный email</span>
          ) : (
            ''
          )}

          <div className={styles.form__row}>
            <input onChange={onChangeMail} value={email} className={styles.form__input} required />
            <label className={styles.form__label}>E-Mail</label>
          </div>

          {invalidField?.includes('password') ? (
            <span className={styles.invalid_field}>Минимум 5 символа</span>
          ) : (
            ''
          )}

          <div className={styles.form__row}>
            <input
              onChange={onChangePass}
              value={password}
              className={styles.form__input}
              required
            />
            <label className={styles.form__label}>Пароль</label>
          </div>
          <button onClick={onClickCreateUser} className={styles.form__submit}>
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
