import React from 'react';

import noAvatar from '../../assets/img/user-avatar.png';

import styles from './UserInfo.module.scss';
import { IUser } from '../../redux';
import { timeTranslate } from '../../utils';
import { SERVER_URL } from '../../env';

type IFooBarProps = IUser & { updatedAt: string };

const UserInfo: React.FC<IFooBarProps> = ({ avatarUrl, fullName, updatedAt }) => {
  return (
    <div className={styles.root}>
      <img className={styles.user__avatar} src={avatarUrl ? `${SERVER_URL}${avatarUrl}` : noAvatar} alt="" />
      <div className={styles.user__details}>
        <span className={styles.user__name}>{fullName}</span>
        <span className={styles.additional}>{timeTranslate(updatedAt)}</span>
      </div>
    </div>
  );
};

export default UserInfo;
