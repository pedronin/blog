import React from 'react';

import { blogApi } from '../redux/api';
import PostBlock from '../components/PostBlock';
import TagsBlock from '../components/TagsBlok';
import Loader from '../components/Loader';
import { useAppDispatch, useAppSelector } from '../Hook/redux';
import { setSortTo } from '../redux/slice';

const Home = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = React.useState('new');

  const { searchTag, sortTo } = useAppSelector((state) => state.slice);

  const { data: postItems } = blogApi.useGetAllPostQuery({ tag: searchTag || '', sortTo });
  const { data: tagsItems } = blogApi.useGetAllTagsQuery('');

  const onClickToActiveTab = (sortTo: string): void => {
    setActiveTab(sortTo);
    dispatch(setSortTo(sortTo));
  };

  if (!postItems || !tagsItems) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="posts__sort">
        <button onClick={() => onClickToActiveTab('new')} className={activeTab === 'new' ? 'active' : ''}>
          Новые
        </button>
        <button
          onClick={() => onClickToActiveTab('popular')}
          className={activeTab === 'popular' ? 'active' : ''}>
          Популярные
        </button>
      </div>
      <div className="flex">
        <div className="left">
          <div className="posts">
            {postItems ? postItems.map((post) => <PostBlock {...post} key={post._id} />) : ''}
          </div>
        </div>
        <TagsBlock tags={tagsItems} />
      </div>
    </div>
  );
};

export default Home;
