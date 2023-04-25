import { parseISO, formatDistanceToNow } from 'date-fns';

const TimeAgo = ({ timestamp }: { timestamp: string }) => {
  const date = parseISO(timestamp);
  const timePeriod = formatDistanceToNow(date);
  const timeAgo = `${timePeriod} ago`;

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;
