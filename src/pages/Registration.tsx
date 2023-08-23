import React from 'react';

import styles from '../components/Form.module.scss';
import { blogApi } from '../redux/api';
import { setUser } from '../redux/userSlice';
import { useAppDispatch, useAppSelector } from '../Hook/redux';
import { useNavigate } from 'react-router-dom';

import avatarImg from '../assets/img/user-avatar.svg';
import cameraImg from '../assets/img/camera.svg';

const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = React.useState('');
  const [valueName, setValueName] = React.useState('');
  const [valueMail, setValueMail] = React.useState('');
  const [valuePass, setValuePass] = React.useState('');

  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const { user } = useAppSelector((state) => state.user);
  const [newUser] = blogApi.useNewUserMutation();
  const [uploadImage] = blogApi.useUploadImageMutation();

  const canSave = [valueName, valueMail, valuePass].every(Boolean);

  const onClickCreateUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (canSave) {
      const obj = {
        fullName: valueName,
        email: valueMail,
        password: valuePass,
        avatarUrl: avatarUrl,
      };

      try {
        const data = await newUser(obj).unwrap();
        setValueName('');
        setValueMail('');
        setValuePass('');
        dispatch(setUser(data));
        navigate('/');
      } catch (err) {
        alert('Ошибка при регистрации');
        console.error(err);
      }
    }
  };

  const handleChangeFile = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (e.currentTarget.files) {
        formData.append('image', e.currentTarget.files[0]);
      }
      // @ts-ignore
      const data = await uploadImage(formData).unwrap();
      console.log(data.url);
      // @ts-ignore
      setAvatarUrl(data.url);
    } catch (err) {
      alert('Ошибка при загрузке аватарки');
      console.error(err);
    }
  };

  React.useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <div className="container">
      <div className={styles.root}>
        <form action="">
          <h4 className={styles.title}>Создание аккаунта</h4>
          <div onClick={() => inputFileRef.current?.click()} className={styles.avatar}>
            <img src={avatarUrl ? `http://localhost:4444/${avatarUrl}` : avatarImg} alt="" />
            <div className={styles.avatar_camera}>
              <img src={cameraImg} alt="ffffff" />
            </div>
          </div>
          <input ref={inputFileRef} onChange={handleChangeFile} type="file" hidden />
          <div className={styles.form__row}>
            <input
              onChange={(e) => setValueName(e.target.value)}
              value={valueName}
              className={styles.form__input}
              required
            />
            <label className={styles.form__label}>Полное имя</label>
          </div>
          <div className={styles.form__row}>
            <input
              onChange={(e) => setValueMail(e.target.value)}
              value={valueMail}
              className={styles.form__input}
              required
            />
            <label className={styles.form__label}>E-Mail</label>
          </div>
          <div className={styles.form__row}>
            <input
              onChange={(e) => setValuePass(e.target.value)}
              value={valuePass}
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
