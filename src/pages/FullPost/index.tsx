import React from 'react';
import { blogApi } from '../../redux/api';
import { Link, useParams } from 'react-router-dom';
import UserInfo from '../../components/UserInfo';

import styles from './FullPost.module.scss';
import { useAppSelector } from '../../Hook/redux';
import CommentsBlok from '../../components/CommentsBlok';
import { timeTranslate } from '../../utils/timeЕranslate';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

const FullPost = () => {
  const { id: postId } = useParams();

  if (!postId) {
    return <h2>Загрузка...</h2>;
  }
  const { data } = blogApi.useGetOnePostQuery(postId, { refetchOnMountOrArgChange: true });
  const { data: comments } = blogApi.useGetCommentsQuery(postId);

  if (!data) {
    return <h1>Загрузка...</h1>;
  }

  const {
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
  } = data;

  return (
    <div className="container">
      <div className={styles.content}>
        <img
          className={styles.content__preview}
          src={imageUrl ? `http://localhost:4444/${imageUrl}` : ''}
          alt=""
        />
        <div className={styles.content__wrapper}>
          <UserInfo {...user} createdAt={timeTranslate(createdAt)} />

          <div className={styles.content__link}>
            <h2 className={styles.content__title}>{title}</h2>

            <ul className={styles.content__tags}>
              {tags.map((tag) => (
                <li key={tag}>
                  <a href={`/tag/${tag}`}>{'#' + tag}</a>
                </li>
              ))}
            </ul>

              <ReactMarkdown children={text} />
            <ul className={styles.content__details}>
              <li>
                <img src={'deleteSvg'} alt="" />
                <span>{viewsCount}</span>
              </li>
              <li>
                <img src={'deleteSvg'} alt="" />
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
