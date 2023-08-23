import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { IPost } from '../../redux/types';

import pencil from '../../assets/img/pecil.svg';
import exit from '../../assets/img/exit.svg';
import noImg from '../../assets/img/image.png';

import styles from './PostBlock.module.scss';
import UserInfo from '../UserInfo';
import { blogApi } from '../../redux/api';
import { useAppSelector } from '../../Hook/redux';

const PostBlock: React.FC<IPost> = ({
  imageUrl,
  _id,
  title,
  text,
  createdAt,
  updatedAt,
  user,
  viewsCount,
  commentsCount,
  tags,
  __v,
}) => {
  const navigate = useNavigate()

  const [removePost, { isLoading }] = blogApi.useRemovePostMutation();

  const currentUser = useAppSelector((state) => state.user.user);

  const onClickRemovePost = async () => {
    if (currentUser?._id === user._id) {
      if (!isLoading) {
        try {
          const token = currentUser.token;
          await removePost({ _id, token }).unwrap();
          console.log(true);
          // navigate('/');
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      alert('Доступно только для создателя поста!');
    }
  };

  const onClickUpdatePost = () => {
    if (currentUser?._id === user._id) {
      navigate(`/update/${_id}`)
    } else {
      alert('Доступно только для создателя поста!');
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.editButtons}>
        <button onClick={onClickRemovePost}>
          <img className={styles.img__remove} src={exit} alt="" />
        </button>
        <button onClick={onClickUpdatePost}>
          {/* <Link to={`/update/${_id}`}> */}
            <img src={pencil} className={styles.img__edit} alt="" />
          {/* </Link> */}
        </button>
      </div>
      {/* noImg */}
      {imageUrl && <img className={styles.image} src={`http://localhost:4444/${imageUrl}`} alt="" />}
      <div className={styles.wrapper}>
        <UserInfo {...user} createdAt={createdAt} />
        <div className={styles.indention}>
          <h2 className={styles.title}>
            <Link to={`/posts/${_id}`}>{title}</Link>
          </h2>

          <ul className={styles.tags}>
            {tags.map((tag) => (
              <li key={tag}>
                <a href={`/tag/${tag}`}>{'#' + tag}</a>
              </li>
            ))}
          </ul>
          {/* {children && <div className={styles.content}>{children}</div>} */}
          <ul className={styles.post__details}>
            <li>
              {/* <img src={deleteSvg} alt="" /> */}
              <span>{viewsCount}</span>
            </li>
            <li>
              {/* <img src={deleteSvg} alt="" /> */}
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostBlock;
