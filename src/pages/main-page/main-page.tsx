import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCity, getIsOffersLoading, getSortedCards } from '../../store/offers-data/selectors';
import CityList from '../../components/city-list/city-list';
import Loader from '../../components/loader/loader';
import { fetchOffers } from '../../store/api-actions';
import { OffersContainer } from '../../components/offers-container/offers-container';

function MainPage(): JSX.Element {
  const activeCity = useAppSelector(getCity);
  const cards = useAppSelector(getSortedCards);
  const isLoading = useAppSelector(getIsOffersLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);


  if (isLoading) {
    return (
      <Loader />
    );
  }


  const isCards = cards?.length !== 0;

  const noPlacesFound = (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {cards.length} places to stay in {activeCity}
        </b>
      </section>
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
        {isCards ? <OffersContainer activeCity={activeCity} cards={cards}/> : noPlacesFound}
      </div>
    </main>

  );
}

export default MainPage;
