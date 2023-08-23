import React from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '../../Hook/redux';
import { setUser } from '../../redux/userSlice';
import Button, { EColor } from '../Button';
import Overlay from '../Overlay';

const Header = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  // const [show, setShow] = React.useState(false)
  // const [hidden, setHidden] = React.useState(true)

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(setUser(null));
      navigate('/');
    }
  };

  React.useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  // при переходе между страницами запускаем анимацию
  // React.useEffect(() => {
  //   console.log(location);

  //   setHidden(false)
  //   setShow(true)

  //   // setTimeout(() => {
  //   // }, 00)
    
  //   setTimeout(() => {
  //     setShow(false)
  //     setHidden(true)
  //   }, 1800)


  // }, [location.pathname]);

  return (
    <div className={styles.header}>
      {/* <Overlay show={show} hidden={hidden} /> */}
      <div className={styles.header__inner}>
        <Link to="/">
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
