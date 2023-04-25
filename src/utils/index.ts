const getTimestamp = (time: number) => new Date(time * 1000).toISOString();

export default getTimestamp;
