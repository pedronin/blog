import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { IPost } from '../../redux/types';

import pencil from '../../assets/img/pecil.svg';
import exit from '../../assets/img/exit.svg';
import eyeIcon from '../../assets/img/eye.svg';
import commentIcon from '../../assets/img/comment.svg';

import styles from './PostBlock.module.scss';
import UserInfo from '../UserInfo';
import { blogApi } from '../../redux/api';
import { useAppDispatch, useAppSelector } from '../../Hook/redux';
import { setSearchTag } from '../../redux/slice';

const PostBlock: React.FC<IPost> = ({
  imageUrl,
  _id,
  title,
  createdAt,
  updatedAt,
  user,
  viewsCount,
  commentsCount,
  tags,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [removePost] = blogApi.useRemovePostMutation();

  const currentUser = useAppSelector((state) => state.slice.user);

  const onClickRemovePost = async () => {
    if (currentUser?._id === user._id) {
      try {
        const token = currentUser.token;
        await removePost({ _id, token });
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Доступно только для создателя поста!');
    }
  };

  const onClickToUpdatePost = () => {
    if (currentUser?._id === user._id) {
      navigate(`/update/${_id}`);
    } else {
      alert('Доступно только для создателя поста!');
    }
  };

  const onClickSetSearchTeg = (tag: string) => {
    dispatch(setSearchTag(tag));
  };

  return (
    <div className={styles.root}>
      <div className={styles.editButtons}>
        <button onClick={onClickRemovePost}>
          <img className={styles.img__remove} src={exit} alt="" />
        </button>
        <button onClick={onClickToUpdatePost}>
          <img src={pencil} className={styles.img__edit} alt="" />
        </button>
      </div>
      {imageUrl && (
        <img className={styles.image} src={`https://blog-ys3l.onrender.com/${imageUrl}`} alt="" />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} updatedAt={updatedAt} />
        <div className={styles.indention}>
          <h2 className={styles.title}>
            <Link to={`/posts/${_id}`}>{title}</Link>
          </h2>

          <ul className={styles.tags}>
            {tags.map((tag) => (
              <li onClick={() => onClickSetSearchTeg(tag)} key={tag}>
                {'#' + tag}
              </li>
            ))}
          </ul>
          <ul className={styles.post__details}>
            <li>
              <img src={eyeIcon} alt="" />
              <span>{viewsCount}</span>
            </li>
            <li>
              <img src={commentIcon} alt="" />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostBlock;
