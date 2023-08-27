import { useAppSelector } from '../../hooks';
import Footer from '../../components/footer/footer';
import { getFavoriteOffers, getIsFavoriteOffersLoading } from '../../store/favorite-offers-data/selectors';
import Loader from '../../components/loader/loader';
import Favorites from '../../components/favorites/favorites';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';

function FavoritesPage(): JSX.Element {
  const cards = useAppSelector(getFavoriteOffers);
  const isLoading = useAppSelector(getIsFavoriteOffersLoading);

  if (isLoading) {
    return <Loader/>;
  }


  return (
    <>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {
            cards?.length !== 0 ?
              <Favorites cards={cards}/> :
              <FavoritesEmpty/>
          }
        </div>
      </main>
      <Footer/>
    </>
  );
}

export default FavoritesPage;
