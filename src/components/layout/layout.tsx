import { Outlet } from 'react-router-dom';
import Header from '../header/header';
import { AuthorizationStatus } from '../../const';

function Layout() {
  return (
    <>
      <Header authorizationStatus={AuthorizationStatus.NoAuth}/>
      <Outlet />
    </>
  );
}

export default Layout;
