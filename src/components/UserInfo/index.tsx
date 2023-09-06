import React from 'react';

import noAvatar from '../../assets/img/user-avatar.png';

import styles from './UserInfo.module.scss';
import { IUser } from '../../redux/types';
import { timeTranslate } from '../../utils/timeTranslate';

type IFooBar = IUser & { updatedAt: string };

const UserInfo: React.FC<IFooBar> = ({ avatarUrl, fullName, updatedAt }) => {
  return (
    <div className={styles.root}>
      <img className={styles.user__avatar} src={avatarUrl ? `http://45.67.58.211:4444/${avatarUrl}` : noAvatar} alt="" />
      <div className={styles.user__details}>
        <span className={styles.user__name}>{fullName}</span>
        <span className={styles.additional}>{timeTranslate(updatedAt)}</span>
      </div>
    </div>
  );
};

export default UserInfo;
