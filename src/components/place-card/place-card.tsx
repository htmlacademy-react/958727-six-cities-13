
import { PlaceCardType } from '../../types/place-card';
import { useState } from 'react';
import cn from 'classnames';
import { capitalize } from '../../helpers/capitalize';
import { AppRoute, RATING_AMPLIFIER } from '../../const';
import { Link, generatePath } from 'react-router-dom';

type PlaceCardProps = {
  blockName?: string;
  cardData: PlaceCardType;
  isPremium: boolean;
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
}

function PlaceCard(props: PlaceCardProps): JSX.Element {

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

  const [ marked, setIsMarked ] = useState(isFavorite);

  const handleMarkButtonClick = () => setIsMarked(!marked);

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
          <button
            onClick={handleMarkButtonClick}
            className={cn(
              'place-card__bookmark-button',
              'button',
              {'place-card__bookmark-button--active' : marked}
            )}
            type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
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
}
export default PlaceCard;
