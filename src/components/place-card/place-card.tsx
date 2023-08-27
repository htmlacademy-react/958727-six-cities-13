
import { PlaceCardType } from '../../types/place-card';
import { memo } from 'react';
import { capitalize } from '../../helpers/capitalize';
import { AppRoute, RATING_AMPLIFIER } from '../../const';
import { Link, generatePath } from 'react-router-dom';
import FavoritesButton from '../shared/favorites-button/favorites-button';

type PlaceCardProps = {
  blockName?: string;
  cardData: PlaceCardType;
  isPremium: boolean;
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
}

const PlaceCard = memo((props: PlaceCardProps): JSX.Element => {

  const {
    blockName,
    cardData,
    isPremium,
    onMouseEnter,
    onMouseLeave
  } = props;

  const {
    id,
    previewImage,
    price,
    rating,
    title,
    type,
    isFavorite } = cardData;

  const handleMouseEnter = () => {
    onMouseEnter?.(id);
  };

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${blockName ? `${blockName}__card` : ''} place-card`}
    >
      {isPremium ? (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      ) : null}
      <div className={`${blockName ? `${blockName}__image-wrapper` : ''} place-card__image-wrapper`}>
        <Link to={generatePath(AppRoute.Offer, { id })}>
          <img
            className="place-card__image"
            src={previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <FavoritesButton
            offerId={id}
            iconWidth={18}
            iconHeight={19}
            blockName='place-card'
            isFavorite={isFavorite}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating * RATING_AMPLIFIER}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Offer, { id })}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
});

PlaceCard.displayName = 'PlaceCard';

export default PlaceCard;
