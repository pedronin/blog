import React from 'react';
import { blogApi } from '../../redux/api';
import { useNavigate, useParams } from 'react-router-dom';
import UserInfo from '../../components/UserInfo';

import styles from './FullPost.module.scss';
import { useAppDispatch } from '../../Hook/redux';
import CommentsBlok from '../../components/CommentsBlok';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { setSearchTag } from '../../redux/slice';

import eyeIcon from '../../assets/img/eye.svg';
import commentIcon from '../../assets/img/comment.svg';
import Loader from '../../components/Loader';

const FullPost = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id: postId } = useParams();

  const onClickSetSearchTeg = (tag: string): void => {
    dispatch(setSearchTag(tag));
    navigate('/');
  };

  if (!postId) {
    return <Loader />;
  }

  const { data } = blogApi.useGetOnePostQuery(postId, { refetchOnMountOrArgChange: true });
  const { data: comments } = blogApi.useGetCommentsQuery(postId);

  if (!data) {
    return <Loader />;
  }

  const { imageUrl, title, text, createdAt, updatedAt, user, viewsCount, commentsCount, tags } =
    data;

  return (
    <div className="container">
      <div className={styles.content}>
        <img
          className={styles.content__preview}
          src={imageUrl ? `http://45.67.58.211:4444/${imageUrl}` : ''}
          alt=""
        />
        <div className={styles.content__wrapper}>
          <UserInfo {...user} updatedAt={updatedAt} />
          <div className={styles.content__link}>
            <h2 className={styles.content__title}>{title}</h2>
            <ul className={styles.content__tags}>
              {tags.map((tag) => (
                <li onClick={() => onClickSetSearchTeg(tag)} key={tag}>
                  {'#' + tag}
                </li>
              ))}
            </ul>
            <ReactMarkdown children={text} />
            <ul className={styles.content__details}>
              <li>
                <img src={eyeIcon} alt="" />
                <span>{viewsCount}</span>
              </li>
              <li>
                <img src={commentIcon} alt="" />
                <span>{comments?.length}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <CommentsBlok postId={postId} />
    </div>
  );
};

export default FullPost;
