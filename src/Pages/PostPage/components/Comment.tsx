import {
  CommentItem,
  fetchNestedComments,
  setExpanded,
} from '../../../app/commentsSlice';
import { useAppDispatch } from '../../../app/hooks';
import Button from '../../../components/Button';

const Comment = ({
  type,
  comment,
}: {
  type: 'child' | 'parent';
  comment: CommentItem;
}) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setExpanded(comment.id));
    dispatch(fetchNestedComments(comment.kids));
  };
  const className = type === 'child' ? 'child' : undefined;
  const nestedComments = Object.values(comment.children ?? []).map((child) => {
    return <Comment key={child.id} comment={child} type="child" />;
  });
  return (
    <article className={className}>
      <span>{comment.by}</span>
      <span>{new Date(comment.time * 1000).toLocaleString('ru')}</span>
      {type === 'parent' && comment.kids && (
        <Button text="View all" onClick={handleClick} />
      )}
      {nestedComments}
    </article>
  );
};

export default Comment;
