import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '../../Hook/redux';
import { setSearchTag, setUser } from '../../redux/slice';
import Button, { EColor } from '../Button';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.slice.user);

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(setUser(null));
      navigate('/');
    }
  };

  React.useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const onClickToHome = () => {
    dispatch(setSearchTag(''));
  };

  return (
    <div className={styles.header}>
      <div className={styles.header__inner}>
        <Link onClick={onClickToHome} to="/">
          <div className={styles.header__logo}>Blog</div>
        </Link>

        <div className={styles.header__buttons}>
          {user ? (
            <>
              <Link to="/create">
                <Button color={EColor.BLUE}>Создать статью</Button>
              </Link>
              <div onClick={onClickLogout}>
                <Button color={EColor.RED}>Выйти</Button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button color={EColor.BORDER_BLUE}>Войти</Button>
              </Link>
              <Link to="/registration">
                <Button color={EColor.BLUE}>Создать аккаунт</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
