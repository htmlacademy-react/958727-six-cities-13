import { NameSpace } from '../../const';
import { getSingleOffer, getIsSingleOfferLoading } from './selectors';
import { createFakeOffer } from '../../utils/mocks/create-fake-offer';

describe('Favorites selectors', () => {
  const state = {
    [NameSpace.SingleOffer]: {
      singleOffer: createFakeOffer(),
      isLoading: false,
      error: '',
    }
  };

  it('should return favorites data from state', () => {
    const { singleOffer } = state[NameSpace.SingleOffer];
    const result = getSingleOffer(state);
    expect(result).toEqual(singleOffer);
  });

  it('should return loading status from state', () => {
    const { isLoading } = state[NameSpace.SingleOffer];
    const result = getIsSingleOfferLoading(state);
    expect(result).toEqual(isLoading);
  });
});
