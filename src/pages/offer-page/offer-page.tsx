
import { useState, useEffect } from 'react';
import { capitalize } from '../../helpers/capitalize';
import PlaceCardList from './../../components/place-card-list/place-card-list';
import cn from 'classnames';
import Map from '../../components/map/map';
import { RATING_AMPLIFIER } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsSingleOfferLoading, getSingleOffer } from '../../store/single-offer-data/selectors';
import Loader from '../../components/loader/loader';
import { fetchNearbyOffers, fetchReviews, fetchSingleOffer } from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import { getIsNearbyOffersLoading, getSortedNearbyOffers } from '../../store/nearby-offers-data/selectors';
import Reviews from '../../components/reviews/reviews';
import { PlaceCardType } from '../../types/place-card';
import { createOfferLocations } from '../../helpers/create-offer-locations';
import { getIsReviewsLoading, getReviews } from '../../store/reviews-data/selectors';

function OfferPage(): JSX.Element | null {
  const {id} = useParams() as {id: PlaceCardType['id']};
  const offer = useAppSelector(getSingleOffer);
  const isOffersLoading = useAppSelector(getIsSingleOfferLoading);
  const isNearbyLoading = useAppSelector(getIsNearbyOffersLoading);
  const isReviewsLoading = useAppSelector(getIsReviewsLoading);
  const reviews = useAppSelector(getReviews);
  const cards = useAppSelector(getSortedNearbyOffers);
  let locationForMap, offerLocations;
  if (cards?.length && offer) {
    locationForMap = offer.city.location;
    offerLocations = createOfferLocations(cards);
    offerLocations.push({
      id: offer.id,
      location: offer.location
    });

  }
  const [ marked, setIsMarked ] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const singleOfferPromise = dispatch(fetchSingleOffer(id));
    const nearbyOffersPromise = dispatch(fetchNearbyOffers(id));
    const reviewsPromise = dispatch(fetchReviews(id));
    return () => {
      singleOfferPromise.abort();
      nearbyOffersPromise.abort();
      reviewsPromise.abort();
    };

  }, [dispatch, id]);

  useEffect(() => {
    if (offer) {
      setIsMarked(offer.isFavorite);
    }
  }, [offer]);

  const handleMarkButtonClick = () => setIsMarked(!marked);

  if (isOffersLoading || isNearbyLoading || isReviewsLoading) {
    return <Loader/>;
  }

  return !offer || Object.keys(offer).length === 0 ?
    null :
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {
              offer.images.map((item) => (
                <div key={item} className="offer__image-wrapper">
                  <img className="offer__image" src={item} alt="Photo studio" />
                </div>
              ))
            }

          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {
              offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )
            }
            <div className="offer__name-wrapper">
              <h1 className="offer__name">{offer.title}</h1>
              <button
                onClick={handleMarkButtonClick}
                className="offer__bookmark-button button"
                type="button"
              >
                <svg className="offer__bookmark-icon" width={31} height={33}>
                  <use xlinkHref="#icon-bookmark" />
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: `${offer.rating * RATING_AMPLIFIER}%` }} />
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{offer.rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">{capitalize(offer.type)}</li>
              <li className="offer__feature offer__feature--bedrooms">
                {offer.bedrooms} Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
            Max {offer.maxAdults} adults
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">€{offer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What`&apos;`s inside</h2>
              <ul className="offer__inside-list">
                {
                  offer.goods.map((item) => <li key={item} className="offer__inside-item">{item}</li>)
                }
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img
                    className="offer__avatar user__avatar"
                    src={offer.host.avatarUrl}
                    width={74}
                    height={74}
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">{offer.host.name}</span>
                <span className="offer__user-status">{offer.host.isPro}</span>
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {offer.description}
                </p>
              </div>
            </div>
            {(!!reviews?.length && !isReviewsLoading) ? <Reviews offerId={id} reviews={reviews}/> : null}
          </div>
        </div>
        {(!!locationForMap && !!offerLocations) &&
            <section className="offer__map map">
              <Map
                selectedPointId={offer.id}
                locations={offerLocations}
                mainLocation={locationForMap}
              />
            </section>}
      </section>
      <div className="container">
        {(!isNearbyLoading && !!cards?.length) && (
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <PlaceCardList
                className={cn(
                  'near-places__list',
                  'places__list'
                )}
                cards={cards}
                cardBlockName='near-places'
              />
            </div>
          </section>
        )}

      </div>
    </main>;
}

export default OfferPage;


