import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { commentsSelectors, fetchComments } from '../../app/commentsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { postSelectors, fetchPost } from '../../app/postSlice';
import Button from '../../components/Button';
import TimeAgo from '../../components/TimeAgo';
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

  const timestamp = new Date(post.time * 1000).toISOString();

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
        <h3>
          <a href={post.url}>{post.title}</a>
        </h3>
        <div>
          <span>By {post.by}</span>
          <TimeAgo timestamp={timestamp} />
        </div>
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
