import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './components/Layout';

import MainPage from './Pages/MainPage/MainPage';
import PostPage from './Pages/PostPage/PostPage';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/:postId',
        element: <PostPage />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
