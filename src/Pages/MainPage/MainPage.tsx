import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchPosts, postsSelectors } from '../../app/postsSlice';
import Button from '../../components/Button';
import SkeletonPost from '../../components/skeletons/SkeletonPost';

import Post from './components/Post';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector(postsSelectors.selectLoadingStatus);
  const posts = useAppSelector(postsSelectors.selectAll);

  useEffect(() => {
    const update = () => {
      dispatch(fetchPosts());
    };
    update();
    const id = setInterval(() => update(), 60000);
    return () => {
      clearInterval(id);
    };
  }, [dispatch]);

  const handlePageRefresh = () => {
    dispatch(fetchPosts());
  };

  const content =
    loadingStatus === 'pending' ? (
      [...Array(10).keys()].map((i) => <SkeletonPost key={i} />)
    ) : (
      <main>
        {posts.map((post) => (
          <Post key={post.id.toString()} post={post} />
        ))}
      </main>
    );

  return (
    <main>
      <Button onClick={handlePageRefresh}>Refresh news</Button>
      {content}
    </main>
  );
};

export default MainPage;
