import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import { useAppDispatch } from '../../../app/hooks';
import TimeAgo from '../../../components/TimeAgo';

import { addPost, PostItem } from '../../../app/postSlice';
import './Post.module.css';
import getTimestamp from '../../../utils';

const Post = ({ post }: { post: PostItem }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = (item: PostItem) => () => {
    dispatch(addPost(item));
    navigate(`/${item.id}`);
  };

  const timestamp = getTimestamp(post.time);

  return (
    <article key={post.id.toString()}>
      <h3>{post.title}</h3>
      <div>
        <span>By {post.by}</span>
        <TimeAgo timestamp={timestamp} />
      </div>
      <p>{post.score} points</p>
      <Button onClick={handleClick(post)}>Read more</Button>
    </article>
  );
};

export default Post;
