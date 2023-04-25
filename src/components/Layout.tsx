import { Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  return (
    <>
      <nav>
        <h1>Hacker News</h1>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
