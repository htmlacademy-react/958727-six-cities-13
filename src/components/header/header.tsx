import { AppRoute, AuthorizationStatus } from '../../const';
import {useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../shared/logo/logo';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import AuthUserNavItems from './auth-user-nav-items';
import { fetchFavoriteOffers } from '../../store/api-actions';
import { getFavoriteOffers } from '../../store/favorite-offers-data/selectors';

function Header(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const location = useLocation();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth && !favoriteOffers) {
      dispatch(fetchFavoriteOffers());
    }
  }, [authorizationStatus, dispatch, favoriteOffers]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo width={81} height={41} blockName='header'/>
          </div>
          {location.pathname !== AppRoute.Login &&
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Auth ?
                  <AuthUserNavItems favoritesCount={favoriteOffers?.length || 0} />
                  :
                  <li className="header__nav-item">
                    <Link to={AppRoute.Login} className="header__nav-link header__nav-link--profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>}
              </ul>
            </nav>}
        </div>
      </div>
    </header>
  );
}

export default Header;
