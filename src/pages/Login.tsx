import React from 'react';

import styles from '../components/Form.module.scss';
import { blogApi } from '../redux/api';
import { useAppDispatch, useAppSelector } from '../Hook/redux';
import { setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [valueMail, setValueMail] = React.useState('');
  const [valuePass, setValuePass] = React.useState('');

  const { user } = useAppSelector((state) => state.user);
  const [loginUser, { isLoading }] = blogApi.useLoginUserMutation();

  const canSave = [valueMail, valuePass].every(Boolean) && !isLoading;

  const onClickLoginUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (canSave) {
      const obj = {
        email: valueMail,
        password: valuePass,
      };

      try {
        const data = await loginUser(obj).unwrap();
        setValueMail('');
        setValuePass('');
        dispatch(setUser(data));
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    }
  };

  React.useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const onChangeMail = (e: React.ChangeEvent<HTMLInputElement>) => setValueMail(e.target.value);
  const onChangePass = (e: React.ChangeEvent<HTMLInputElement>) => setValuePass(e.target.value);

  return (
    <div className="container">
      <div className={styles.root}>
        <form action="">
          <h4 className={styles.title}>Вход в аккаунт</h4>
          <div className={styles.form__row}>
            <input
              onChange={onChangeMail}
              value={valueMail}
              className={styles.form__input}
              required
            />
            <label className={styles.form__label} htmlFor="">
              E-Mail
            </label>
          </div>
          <div className={styles.form__row}>
            <input
              onChange={onChangePass}
              value={valuePass}
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
