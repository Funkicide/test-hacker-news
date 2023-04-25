import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import { useAppDispatch } from '../../../app/hooks';

import { addPost, PostItem } from '../../../app/postSlice';
import './Post.module.css';

const Post = ({ post }: { post: PostItem }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = (item: PostItem) => () => {
    dispatch(addPost(item));
    navigate(`/${item.id}`);
  };

  return (
    <article key={post.id.toString()}>
      <span>{post.title}</span>
      <span>By: {post.by}</span>
      <span>{new Date(post.time * 1000).toLocaleString('ru')}</span>
      <span>{post.score} points</span>
      <Button text="Read more" onClick={handleClick(post)} />
    </article>
  );
};

export default Post;
