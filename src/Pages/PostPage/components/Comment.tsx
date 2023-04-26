import parse from 'html-react-parser';

import {
  CommentItem,
  fetchNestedComments,
  setExpanded,
} from '../../../app/commentsSlice';
import { useAppDispatch } from '../../../app/hooks';
import Button from '../../../components/Button';
import TimeAgo from '../../../components/TimeAgo';
import getTimestamp from '../../../utils';

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

  const timestamp = getTimestamp(comment.time);

  const className = type === 'child' ? 'comment child' : 'comment';

  const nestedComments = Object.values(comment.children ?? []).map((child) => {
    return <Comment key={child.id} comment={child} type="child" />;
  });

  if (comment.dead || (comment.deleted && !comment.kids)) {
    return null;
  }

  return (
    <article className={className}>
      <p className="credits">
        <span>By {comment.by}</span>
        <TimeAgo timestamp={timestamp} />
      </p>
      {comment.text && parse(comment.text)}
      {type === 'parent' && comment.kids && (
        <Button onClick={handleClick}>Expand</Button>
      )}
      {nestedComments}
    </article>
  );
};

export default Comment;
