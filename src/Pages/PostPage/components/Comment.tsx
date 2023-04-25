import {
  CommentItem,
  fetchNestedComments,
  setExpanded,
} from '../../../app/commentsSlice';
import { useAppDispatch } from '../../../app/hooks';
import Button from '../../../components/Button';
import TimeAgo from '../../../components/TimeAgo';

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

  const timestamp = new Date(comment.time * 1000).toISOString();

  const className = type === 'child' ? 'child' : undefined;

  const nestedComments = Object.values(comment.children ?? []).map((child) => {
    return <Comment key={child.id} comment={child} type="child" />;
  });

  return (
    <article className={className}>
      <div>
        <span>By {comment.by}</span>
        <TimeAgo timestamp={timestamp} />
      </div>
      {type === 'parent' && comment.kids && (
        <Button text="View all" onClick={handleClick} />
      )}
      {nestedComments}
    </article>
  );
};

export default Comment;
