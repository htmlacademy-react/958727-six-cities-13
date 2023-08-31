import { NameSpace } from '../../const';
import { getFavoriteOffers, getIsFavoriteOffersLoading } from './selectors';
import { createFakeOffers } from './../../utils/mocks/create-fake-offers';

describe('Favorites selectors', () => {
  const state = {
    [NameSpace.FavoriteOffers]: {
      favoriteOffers: createFakeOffers(true),
      isLoading: false,
      error: '',
    }
  };

  it('should return favorites data from state', () => {
    const { favoriteOffers } = state[NameSpace.FavoriteOffers];
    const result = getFavoriteOffers(state);
    expect(result).toEqual(favoriteOffers);
  });

  it('should return loading status from state', () => {
    const { isLoading } = state[NameSpace.FavoriteOffers];
    const result = getIsFavoriteOffersLoading(state);
    expect(result).toEqual(isLoading);
  });
});
