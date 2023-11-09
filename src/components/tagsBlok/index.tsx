import React from 'react';

import styles from './TagsBlok.module.scss';
import { TypeTags, setSearchTag} from '../../redux';
import { useAppDispatch } from '../../Hook/redux';

interface ITagsBlockProps {
  tags: TypeTags;
}

const TagsBlock: React.FC<ITagsBlockProps> = ({ tags }) => {
  const dispatch = useAppDispatch();

  const onClickSetSearchTag = (tag: string) => {
    dispatch(setSearchTag(tag));
  };

  return (
    <div className={`${styles.root} tags`}>
      <h2 className={styles.title}>Тэги</h2>
      <ul className={styles.tags__list}>
      <h2 onClick={() => onClickSetSearchTag('')} className={styles.tags__item}>Все статьи</h2>
        {tags.map((tag) => (
          <li onClick={() => onClickSetSearchTag(tag)} className={styles.tags__item} key={tag}>
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagsBlock;
