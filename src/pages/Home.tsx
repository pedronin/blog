import React from 'react';

import { blogApi } from '../redux/api';
import PostBlock from '../components/PostBlock';
import TagsBlock from '../components/TagsBlok';
import Loader from '../components/Loader';
import { useAppDispatch, useAppSelector } from '../Hook/redux';
import { setFirstLaunch, setSortTo } from '../redux/slice';

const Home = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = React.useState('new');

  const { searchTag, sortTo } = useAppSelector((state) => state.slice);

  const {
    data: postItems,
    isLoading: isLoadingItems,
    isFetching,
  } = blogApi.useGetAllPostQuery({
    tag: searchTag || '',
    sortTo,
  });

  React.useEffect(() => {
    if (postItems?.length) {
      dispatch(setFirstLaunch());
    }
  }, [postItems]);

  const { data: tagsItems, error } = blogApi.useGetAllTagsQuery('');

  const onClickToActiveTab = (sortTo: string): void => {
    setActiveTab(sortTo);
    dispatch(setSortTo(sortTo));
  };

  if (isLoadingItems) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="posts__sort">
        <button
          onClick={() => onClickToActiveTab('new')}
          className={activeTab === 'new' ? 'active' : ''}>
          Новые
        </button>
        <button
          onClick={() => onClickToActiveTab('popular')}
          className={activeTab === 'popular' ? 'active' : ''}>
          Популярные
        </button>
      </div>

      <div className="flex">
        {error ? <h1>Произошла ошибка при загрузке. Проверьту подключение</h1> : ''}
        {postItems ? (
          <div className="posts">
            {isFetching ? (
              <Loader widthContent={true} backW={true} />
            ) : (
              postItems.map((post) => <PostBlock {...post} key={post._id} />)
            )}
          </div>
        ) : (
          ''
        )}
        <TagsBlock tags={tagsItems || []} />
      </div>
    </div>
  );
};

export default Home;
