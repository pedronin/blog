import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '../../Hook/redux';
import { setSearchTag, setUser } from '../../redux';
import Button, { EButtonColor } from '../Button';

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
                <Button color={EButtonColor.BLUE}>Создать статью</Button>
              </Link>
              <Button onClick={onClickLogout} color={EButtonColor.RED}>Выйти</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button color={EButtonColor.BORDER_BLUE}>Войти</Button>
              </Link>
              <Link to="/registration">
                <Button color={EButtonColor.BLUE}>Создать аккаунт</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
