import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { commentsSelectors, fetchComments } from '../../app/commentsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { postSelectors, fetchPost } from '../../app/postSlice';
import Button from '../../components/Button';
import TimeAgo from '../../components/TimeAgo';
import getTimestamp from '../../utils';
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

  const timestamp = getTimestamp(post.time);

  const commentCountComponent = <p>{`${post.descendants} comments`}</p>;

  return (
    <main>
      <div className="buttonContainer">
        <Button onClick={handleReturnToMain}>Return to main page</Button>
        <Button onClick={handleRefreshComments}>Refresh comments</Button>
      </div>
      <article className="post">
        <h3>
          <a href={post.url}>{post.title}</a>
        </h3>
        <p className="credits">
          <span>By {post.by}</span>
          <TimeAgo timestamp={timestamp} />
        </p>
        {!!post.descendants && commentCountComponent}
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
