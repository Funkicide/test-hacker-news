import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import { useAppDispatch } from '../../../app/hooks';
import TimeAgo from '../../../components/TimeAgo';

import { addPost, PostItem } from '../../../app/postSlice';
import './Post.module.css';

const Post = ({ post }: { post: PostItem }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = (item: PostItem) => () => {
    dispatch(addPost(item));
    navigate(`/${item.id}`);
  };

  const timestamp = new Date(post.time * 1000).toISOString();

  return (
    <article key={post.id.toString()}>
      <h3>{post.title}</h3>
      <div>
        <span>By {post.by}</span>
        <TimeAgo timestamp={timestamp} />
      </div>
      <p>{post.score} points</p>
      <Button text="Read more" onClick={handleClick(post)} />
    </article>
  );
};

export default Post;
