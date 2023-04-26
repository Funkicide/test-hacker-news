import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { commentsSelectors, fetchComments } from '../../app/commentsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { postSelectors, fetchPost } from '../../app/postSlice';

import Button from '../../components/Button';
import SkeletonComment from '../../components/skeletons/SkeletonComment';
import Comment from './components/Comment';
import PostWithComments from './components/PostWithComments';

const PostPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const post = useAppSelector(postSelectors.selectPost);
  const postKids = useAppSelector(postSelectors.selectKids);
  const postStatus = useAppSelector(postSelectors.selectLoadingStatus);

  const comments = useAppSelector(commentsSelectors.selectAll);
  const commentsStatus = useAppSelector(commentsSelectors.selectLoadingStatus);

  useEffect(() => {
    dispatch(fetchComments(postKids));
  }, [dispatch, postKids]);

  const handleReturnToMain = () => {
    navigate('/');
  };

  const handleRefreshComments = () => {
    dispatch(fetchPost(post.id));
  };

  const isLoading = postStatus === 'pending' || commentsStatus === 'pending';

  const commentsContent = isLoading
    ? Object.values(comments).map(({ id }) => <SkeletonComment key={id} />)
    : comments &&
      Object.values(comments).map((comment) => (
        <Comment key={comment.id.toString()} comment={comment} type="parent" />
      ));

  return (
    <main>
      <div className="buttonContainer">
        <Button onClick={handleReturnToMain}>Return to main page</Button>
        <Button onClick={handleRefreshComments}>Refresh comments</Button>
      </div>
      <PostWithComments post={post} />
      {commentsContent}
    </main>
  );
};

export default PostPage;
