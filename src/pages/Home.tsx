import React from 'react';

import { blogApi } from '../redux/api';
import PostBlock from '../components/PostBlock';
import TagsBlock from '../components/tagsBlok';
import Loader from '../components/Loader';

const Home = () => {
  const [activeTab, setActiveTab] = React.useState('new');

  const { data: postItems } = blogApi.useGetAllPostQuery('');
  const { data: tagsItems } = blogApi.useGetAllTagsQuery('');

  if (!postItems || !tagsItems) {
    return <Loader backW={false} />;
  }

  return (
    <div className="container">
      <div className="posts__sort">
        <button onClick={() => setActiveTab('new')} className={activeTab === 'new' ? 'active' : ''}>
          Новые
        </button>
        <button
          onClick={() => setActiveTab('popular')}
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
