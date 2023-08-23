import React from 'react';

import styles from './tagsBlok.module.scss';
import { TypeTags } from '../../redux/types';

interface ITagsBlock {
  tags: TypeTags;
}

const TagsBlock: React.FC<ITagsBlock> = ({ tags }) => {
  return (
    <div className={`${styles.root} tags`}>
      <h2 className={styles.title}>Тэги</h2>
      <ul className={styles.tags__list}>
        {tags.map((tag) => (
          <li className={styles.tags__item} key={tag}>{tag}</li>
        ))}
      </ul>
    </div>
  );
};

export default TagsBlock;
