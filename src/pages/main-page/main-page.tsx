import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCity, getIsOffersLoading, getSortedCards } from '../../store/offers-data/selectors';
import CityList from '../../components/city-list/city-list';
import Loader from '../../components/loader/loader';
import { fetchOffers } from '../../store/api-actions';
import { OffersContainer } from '../../components/offers-container/offers-container';
import MainEmpty from '../../components/main-empty/main-empty';
import Layout from '../../components/layout/layout';
import cn from 'classnames';

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

  return (
    <Layout className='page--gray page--main'>
      <main
        className={cn(
          'page__main',
          'page__main--index',
          {'page__main--index-empty' : !isCards})}
      >
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList />
          </section>
        </div>
        <div className="cities">
          {isCards ? <OffersContainer activeCity={activeCity} cards={cards}/> : <MainEmpty activeCity={activeCity}/>}
        </div>
      </main>
    </Layout>

  );
}

export default MainPage;
