import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavoriteOffers, getIsFavoriteOffersLoading } from '../../store/favorite-offers-data/selectors';
import Loader from '../../components/loader/loader';
import Favorites from '../../components/favorites/favorites';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import { fetchFavoriteOffers } from '../../store/api-actions';
import { useEffect } from 'react';

function FavoritesPage(): JSX.Element {
  const cards = useAppSelector(getFavoriteOffers);
  const isLoading = useAppSelector(getIsFavoriteOffersLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!cards) {
      dispatch(fetchFavoriteOffers());
    }
  }, [dispatch, cards]);

  if (isLoading) {
    return <Loader/>;
  }

  return (
    cards?.length !== 0 ?
      <Favorites cards={cards ? cards : []}/> :
      <FavoritesEmpty/>
  );
}

export default FavoritesPage;
