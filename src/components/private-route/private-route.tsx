import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { PropsWithChildren, ReactNode } from 'react';
import Loader from '../loader/loader';

type PrivateRouteProps = PropsWithChildren<{
  authorizationStatus: AuthorizationStatus;
}>

function PrivateRoute(props: PrivateRouteProps): ReactNode {
  const {authorizationStatus, children} = props;

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Loader />;
  }

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
