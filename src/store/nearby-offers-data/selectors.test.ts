import { NameSpace } from '../../const';
import { getIsNearbyOffersLoading, getNearbyOffers } from './selectors';
import { createFakeOffers } from './../../utils/mocks/create-fake-offers';

describe('Favorites selectors', () => {
  const state = {
    [NameSpace.NearbyOffers]: {
      nearbyOffers: createFakeOffers(true),
      isLoading: false,
      error: '',
    }
  };

  it('should return nearby offers data from state', () => {
    const { nearbyOffers } = state[NameSpace.NearbyOffers];
    const result = getNearbyOffers(state);
    expect(result).toEqual(nearbyOffers);
  });

  it('should return loading status from state', () => {
    const { isLoading } = state[NameSpace.NearbyOffers];
    const result = getIsNearbyOffersLoading(state);
    expect(result).toEqual(isLoading);
  });
});
