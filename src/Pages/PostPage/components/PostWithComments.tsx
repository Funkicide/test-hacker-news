import type { PostItem } from '../../../app/postSlice';
import TimeAgo from '../../../components/TimeAgo';
import getTimestamp from '../../../utils';

const PostWithComments = ({ post }: { post: PostItem }) => {
  const timestamp = getTimestamp(post.time);

  const commentCountComponent = <p>{`${post.descendants} comments`}</p>;

  return (
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
  );
};
export default PostWithComments;
