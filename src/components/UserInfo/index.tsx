import React from 'react';

import noAvatar from '../../assets/img/noavatar.jpg';

import styles from './UserInfo.module.scss';
import { IUser } from '../../redux/types';
import { timeTranslate } from '../../utils/timeЕranslate';

// interface IUserInfo = IUser & ICreatedAt
// interface IUserInfo = IUser<createdAt: string>

type IFooBar = IUser & { createdAt: string };

const UserInfo: React.FC<IFooBar> = ({ avatarUrl, fullName, createdAt }) => {
  return (
    <div className={styles.root}>
      <img className={styles.user__avatar} src={avatarUrl ? `http://localhost:4444/${avatarUrl}` : noAvatar} alt="" />
      <div className={styles.user__details}>
        <span className={styles.user__name}>{fullName}</span>
        <span className={styles.additional}>{timeTranslate(createdAt)}</span>
      </div>
    </div>
  );
};

export default UserInfo;
