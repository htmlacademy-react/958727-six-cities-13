
import { useCallback, useState } from 'react';
import Sorting from '../sorting/sorting';
import PlaceCardList from '../place-card-list/place-card-list';
import cn from 'classnames';
import Map from '../map/map';
import { PlaceCardType } from '../../types/place-card';
import { createOfferLocations } from '../../helpers/create-offer-locations';

type OffersContainerProps = {
    activeCity: string;
    cards: PlaceCardType[];
}

export const OffersContainer = (props: OffersContainerProps) => {
  const {activeCity, cards} = props;
  const [activeCardId, setActiveCardId] = useState('');
  const locationForMap = cards[0].city.location;
  const offerLocations = createOfferLocations(cards);

  const onMouseEnter = useCallback((id: string) => {
    setActiveCardId(id);
  }, []);

  const onMouseLeave = useCallback(() => {
    setActiveCardId('');
  }, []);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{cards.length} {`${cards.length === 1 ? 'place' : 'places'}`} to stay in {activeCity}</b>
        <Sorting/>
        <PlaceCardList
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          cards={cards}
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
    </div>);

};
