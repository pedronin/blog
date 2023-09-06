import React from 'react';

import styles from './PopupAvatar.module.scss';
import Button, { EColor } from '../Button';

interface IPopupAvatar {
  onChangeAvatarUrl: (url: string) => void;
}

// компонента с готовыми аватарками
const PopupAvatar: React.FC<IPopupAvatar> = ({ onChangeAvatarUrl }) => {
  const [hidden, setHidden] = React.useState(true);

  const onClickAvatar = (i: number): void => {
    onChangeAvatarUrl(`uploads/hero${i + 1}`);
    setHidden(true);
  };

  return (
    <div className={styles.root}>
      <div onClick={() => setHidden(false)} className={styles.button}>
        <Button color={EColor.BORDER_BLUE}>Выбрать из списка</Button>
      </div>
      <div className={`${styles.popup} ${hidden ? styles.hidden : ''}`}>
        <ul className={styles.popup__list}>
          {[...new Array(8)].map((_, i) => (
            <li className={styles.popup__item} key={i}>
              <img
                onClick={() => onClickAvatar(i)}
                src={`http://45.67.58.211:4444/uploads/hero${i + 1}`}
                alt="i"
              />
            </li>
          ))}
        </ul>
        <button onClick={() => setHidden(true)} className={styles.popup__close}>
          x
        </button>
      </div>
    </div>
  );
};

export default PopupAvatar;
