import React from 'react';

import noAvatar from '../../assets/img/user-avatar.png';

import styles from './CommentsBlok.module.scss';
import stylesForm from '../Form.module.scss';

import { blogApi } from '../../redux/api';
import { useAppSelector } from '../../Hook/redux';
import Button, { EColor } from '../Button';

interface ICommentsBlok {
  postId: string;
}

const CommentsBlok: React.FC<ICommentsBlok> = ({ postId }) => {
  const currUser = useAppSelector((state) => state.slice.user);
  const [valueComment, setValueComment] = React.useState('');
  const [createComment] = blogApi.useCreateCommentMutation();

  const { data: comments } = blogApi.useGetCommentsQuery(postId);

  const onClickCreateComment = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (currUser === null) {
      return alert('Для начала авторизируйтесь');
    }
    if (!postId) {
      return;
    }
    try {
      const infoComment = {
        text: valueComment,
        postId: postId,
        user: currUser._id,
      };
      setValueComment('');
      await createComment({ infoComment, token: currUser?.token });
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeValueComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueComment(e.target.value);
  };

  return (
    <div className={styles.comments}>
      <h2 className={styles.comments__title}>Комментарии</h2>
      <ul className={styles.comments__list}>
        {comments?.map((obj) => (
          <li className={styles.comments__item} key={obj.text + obj.user}>
            <img
              className={styles.avatar}
              src={
                obj.user.avatarUrl
                  ? `http://45.67.58.211:4444/${obj.user.avatarUrl}`
                  : noAvatar
              }
              alt="f"
            />
            <div className={styles.comments__item_content}>
              <span>{obj?.user.fullName}</span>
              <p>{obj?.text}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.comments__send}>
        <div className="flex">
          <img
            className={styles.avatar}
            src={
              currUser?.avatarUrl
                ? `http://45.67.58.211:4444/${currUser?.avatarUrl}`
                : noAvatar
            }
            alt=""
          />
          <form className={styles.form}>
            <div className={stylesForm.form__row}>
              <input
                onChange={onChangeValueComment}
                value={valueComment}
                className={stylesForm.form__input}
                required
              />
              <label className={stylesForm.form__label} htmlFor="">
                Написать комментарий
              </label>
            </div>
            <div onClick={onClickCreateComment} className={styles.widthContent}>
              <Button color={EColor.BLUE}>Отправить</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentsBlok;
