import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header>
        <h1>Hacker News</h1>
      </header>

      <Outlet />
    </>
  );
};

export default Layout;
