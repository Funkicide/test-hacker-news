export const API_PATH = 'https://hacker-news.firebaseio.com/v0';

const routes = {
  dataPath: () => '/beststories.json',
  itemPath: (id: number) => ['/item', `${id}.json`].join('/'),
};

export default routes;
