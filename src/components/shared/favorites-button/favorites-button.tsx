import cn from 'classnames';
import { useState } from 'react';
import { PlaceCardType } from '../../../types/place-card';
import { fetchFavorite } from '../../../helpers/fetch-favorite';
import { OfferCardType } from '../../../types/offer-card';
import { getAuthorizationStatus } from '../../../store/user-process/selectors';
import { APIRoute, AuthorizationStatus } from '../../../const';
import browserHistory from '../../../browser-history';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchFavoriteOffers } from '../../../store/api-actions';

type FavoritesButton = {
  iconWidth: number;
  iconHeight: number;
  blockName: string;
  offerId: PlaceCardType['id'];
  isFavorite?: boolean;
}

function FavoritesButton(props: FavoritesButton): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const { iconWidth, iconHeight, blockName, offerId, isFavorite } = props;
  const [ isMarked, setIsMarked ] = useState(isFavorite || false);
  const dispatch = useAppDispatch();
  const handleMarkButtonClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      browserHistory.push(APIRoute.Login);
      return;
    }
    setIsMarked(!isMarked);
    const status = isMarked ? 0 : 1;
    fetchFavorite<OfferCardType>(offerId, status).then(() =>
      dispatch(fetchFavoriteOffers())
    );
  };
  return (
    <button
      onClick={handleMarkButtonClick}
      className={cn(
        `${blockName}__bookmark-button`,
        'button',
        {[`${blockName}__bookmark-button--active`] : isMarked}
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

