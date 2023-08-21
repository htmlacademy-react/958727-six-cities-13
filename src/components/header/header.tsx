import { AppRoute, AuthorizationStatus } from '../../const';
import { Link } from 'react-router-dom';
import Logo from '../shared/logo/logo';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus, getUserData } from '../../store/user-process/selectors';
import { fetchLogout } from '../../store/api-actions';

function Header(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userData = useAppSelector(getUserData);
  const dispatch = useAppDispatch();
  const handleSignOutClick = () => {
    dispatch(fetchLogout());
  };
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo width={81} height={41} blockName='header'/>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === AuthorizationStatus.Auth ?
                <>
                  <li className="header__nav-item user">
                    <Link
                      to={AppRoute.Favorites}
                      className="header__nav-link header__nav-link--profile"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">
                        {userData.email}
                      </span>
                      <span className="header__favorite-count">3</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <a onClick={handleSignOutClick} className="header__nav-link">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </>
                :
                <li className="header__nav-item">
                  <Link to={AppRoute.Login} className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
