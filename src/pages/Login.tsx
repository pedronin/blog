import React from 'react';

import styles from '../components/Form.module.scss';
import { blogApi } from '../redux/api';
import { useAppDispatch, useAppSelector } from '../Hook/redux';
import { setUser } from '../redux/slice';
import { useNavigate } from 'react-router-dom';
import { isValidField } from '../utils/isValidField';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [invalidField, setInvalidField] = React.useState<string[]>();
  const [message, setMessage] = React.useState<string>('');

  const user = useAppSelector((state) => state.slice.user);
  const [loginUser] = blogApi.useLoginUserMutation();

  const onClickLoginUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const obj = {
      email,
      password,
    };

    try {
      setInvalidField([]);
      const data = await loginUser(obj).unwrap();
      setEmail('');
      setPassword('');
      dispatch(setUser(data));
      navigate('/');
    } catch (err: any) {
      setInvalidField([]);
      const invalid = isValidField(err);
      if (invalid.length === 0) {
        setMessage(err.data?.message);
      } else {
        setInvalidField(invalid);
      }
    }
  };

  React.useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const onChangeMail = (e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value);
  const onChangePass = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setPassword(e.target.value);

  return (
    <div className="container">
      <div className={styles.root}>
        <form action="">
          <h4 className={styles.title}>Вход в аккаунт</h4>
          {<span className={styles.invalid_field}>{message}</span>}
          {invalidField?.includes('email') ? (
            <span className={styles.invalid_field}>Не валидный email</span>
          ) : (
            ''
          )}
          <div className={styles.form__row}>
            <input onChange={onChangeMail} value={email} className={styles.form__input} required />
            <label className={styles.form__label} htmlFor="">
              E-Mail
            </label>
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
            <label className={styles.form__label} htmlFor="">
              Пароль
            </label>
          </div>
          <button onClick={onClickLoginUser} className={styles.form__submit}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
