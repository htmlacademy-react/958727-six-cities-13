import { useCallback, useState } from 'react';
import cn from 'classnames';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import Map from './../../components/map/map';
import { useAppSelector } from '../../hooks';
import { getCity, getOffers } from '../../store/offers-data/selectors';
import CityList from '../../components/city-list/city-list';
import { LocationItemType } from '../../types/location';
import { PlaceCardType } from '../../types/place-card';
import Sorting from '../../components/sorting/sorting';

const createOfferLocations = (offers: PlaceCardType[]): LocationItemType[] => offers.map((offer) => ({
  id: offer.id,
  location: offer.location
}));

function MainPage(): JSX.Element {
  const [activeCardId, setActiveCardId ] = useState('');
  const activeCity = useAppSelector(getCity);
  const cards = useAppSelector(getOffers);
  const filteredCards = [...cards].filter((card) => card.city.name === activeCity);
  const isFilteredCards = filteredCards.length !== 0;
  const locationForMap = isFilteredCards ? filteredCards[0].city.location : cards[0].city.location;
  const offerLocations = isFilteredCards ? createOfferLocations(filteredCards) : createOfferLocations(cards);

  const onMouseEnter = useCallback((id: string) => {
    setActiveCardId(id);
  }, []);

  const onMouseLeave = useCallback(() => {
    setActiveCardId('');
  }, []);

  const noPlacesFound = (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {filteredCards.length} places to stay in {activeCity}
        </b>
      </section>
    </div>
  );

  const offersContainer = (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{filteredCards.length} places to stay in {activeCity}</b>
        <Sorting cards={cards}/>
        <PlaceCardList
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          cards={filteredCards}
          className={cn(
            'cities__places-list',
            'places__list',
            'tabs__content'
          )}
          cardBlockName='cities'
        />
      </section>
      {
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map
              selectedPointId={activeCardId}
              locations={offerLocations}
              mainLocation={locationForMap}
            />
          </section>
        </div>
      }
    </div>
  );


  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CityList />
        </section>
      </div>
      <div className="cities">
        {isFilteredCards ? offersContainer : noPlacesFound}
      </div>
    </main>

  );
}

export default MainPage;
