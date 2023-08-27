import cn from 'classnames';
import { PlaceCardType } from '../../../types/place-card';
import { getAuthorizationStatus } from '../../../store/user-process/selectors';
import { AppRoute, AuthorizationStatus } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchFavorite } from '../../../store/api-actions';
import { redirectToRoute } from '../../../store/action';

type FavoritesButtonProps = {
  iconWidth: number;
  iconHeight: number;
  blockName: string;
  offerId: PlaceCardType['id'];
  isFavorite: boolean;
}

function FavoritesButton(props: FavoritesButtonProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const { iconWidth, iconHeight, blockName, offerId, isFavorite = false } = props;
  const dispatch = useAppDispatch();
  const handleMarkButtonClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Login));
      return;
    }
    const status = isFavorite ? 0 : 1;
    dispatch(fetchFavorite({offerId, favoriteStatus: status}));
  };
  return (
    <button
      onClick={handleMarkButtonClick}
      className={cn(
        `${blockName}__bookmark-button`,
        'button',
        {[`${blockName}__bookmark-button--active`] : isFavorite}
      )}
      type="button"
    >
      <svg
        className={`${blockName}__bookmark-icon`}
        width={iconWidth}
        height={iconHeight}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">In bookmarks</span>
    </button>
  );
}

export default FavoritesButton;

