import Skeleton from './Skeleton';

const SkeletonComment = () => {
  return (
    <div className="post">
      <Skeleton classes="title width-50" />
      <Skeleton classes="text width-100" />
      <Skeleton classes="text width-100" />
    </div>
  );
};
export default SkeletonComment;
