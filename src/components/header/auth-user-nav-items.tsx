import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchLogout } from '../../store/api-actions';
import { getFavoriteOffers } from '../../store/favorite-offers-data/selectors';
import { getUserData } from '../../store/user-process/selectors';

function AuthUserNavItems(): JSX.Element {
  const userData = useAppSelector(getUserData);
  const dispatch = useAppDispatch();
  const handleSignOutClick = () => {
    dispatch(fetchLogout());
  };
  const favorites = useAppSelector(getFavoriteOffers);
  return (
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
          <span className="header__favorite-count">{favorites.length}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <a onClick={handleSignOutClick} className="header__nav-link">
          <span className="header__signout">Sign out</span>
        </a>
      </li>
    </>
  );
}

export default AuthUserNavItems;
