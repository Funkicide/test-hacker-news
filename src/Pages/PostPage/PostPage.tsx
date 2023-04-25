import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { commentsSelectors, fetchComments } from '../../app/commentsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { postSelectors, fetchPost } from '../../app/postSlice';
import Button from '../../components/Button';
import Comment from './components/Comment';

const PostPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const post = useAppSelector(postSelectors.selectPost);
  const postKids = useAppSelector(postSelectors.selectKids);
  const comments = useAppSelector(commentsSelectors.selectAll);

  useEffect(() => {
    dispatch(fetchComments(postKids));
  }, [dispatch, postKids]);

  const handleReturnToMain = () => {
    navigate('/');
  };

  const handleRefreshComments = () => {
    dispatch(fetchPost(post.id));
  };

  return (
    <main>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          padding: '1rem 0 1rem 0',
        }}
      >
        <Button text="Return to main page" onClick={handleReturnToMain} />
        <Button text="Refresh comments" onClick={handleRefreshComments} />
      </div>
      <article>
        <p>
          <a href={post.url}>{post.title}</a>
        </p>
        <p>
          <strong>By: {post.by}</strong>
        </p>
        <p>{new Date(post.time * 1000).toLocaleString('ru')}</p>
        <p>{`${post.descendants} comments`}</p>
      </article>
      {comments &&
        Object.values(comments).map((comment) => (
          <Comment
            key={comment.id.toString()}
            comment={comment}
            type="parent"
          />
        ))}
    </main>
  );
};

export default PostPage;
