import { INITIAL_CITY, INITIAL_FILTER_TYPE, NameSpace } from '../../const';
import { getOffers, getIsOffersLoading, getCity, getFilterType } from './selectors';
import { createFakeOffers } from './../../utils/mocks/create-fake-offers';

describe('Offers selectors', () => {
  const state = {
    [NameSpace.Offers]: {
      offers: createFakeOffers(true),
      city: INITIAL_CITY,
      filterType: INITIAL_FILTER_TYPE,
      isLoading: false,
      error: '',
    }
  };

  it('should return offers data from state', () => {
    const { offers } = state[NameSpace.Offers];
    const result = getOffers(state);
    expect(result).toEqual(offers);
  });

  it('should return city data from state', () => {
    const { city } = state[NameSpace.Offers];
    const result = getCity(state);
    expect(result).toEqual(city);
  });

  it('should return filterType data from state', () => {
    const { filterType } = state[NameSpace.Offers];
    const result = getFilterType(state);
    expect(result).toEqual(filterType);
  });

  it('should return loading status from state', () => {
    const { isLoading } = state[NameSpace.Offers];
    const result = getIsOffersLoading(state);
    expect(result).toEqual(isLoading);
  });
});
