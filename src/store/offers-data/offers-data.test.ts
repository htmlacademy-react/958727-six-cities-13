import {expect} from 'vitest';
import { createFakeOffers } from '../../utils/mocks/create-fake-offers';
import { fetchOffers } from '../api-actions';
import { offersData, setCity, setFilterType, setOffers } from './offers-data';
import { Cities, INITIAL_CITY, INITIAL_FILTER_TYPE, SortingOptions } from '../../const';

vi.mock('../root-reducer', () => ({ rootReducer: vi.fn() }));

describe('offersData', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      offers: [],
      city: INITIAL_CITY,
      filterType: INITIAL_FILTER_TYPE,
      isLoading: false,
      error: '',

    };

    const result = offersData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });


  it('should load array of offers', () => {
    const mockOffers = createFakeOffers(true);
    const expectedState = {
      offers: mockOffers,
      city: INITIAL_CITY,
      filterType: INITIAL_FILTER_TYPE,
      isLoading: false,
      error: '',
    };

    const result = offersData.reducer(undefined, fetchOffers.fulfilled(mockOffers, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set city to expectedCity', () => {
    const initialState = {
      offers: [],
      city: INITIAL_CITY,
      filterType: INITIAL_FILTER_TYPE,
      isLoading: false,
      error: '',
    };

    const expectedCity = Cities.Brussels;

    const result = offersData.reducer(initialState, setCity(expectedCity));

    expect(result.city).toBe(expectedCity);
  });

  it('should set city to expectedFilterType', () => {
    const initialState = {
      offers: [],
      city: INITIAL_CITY,
      filterType: INITIAL_FILTER_TYPE,
      isLoading: false,
      error: '',
    };

    const expectedFilterType = SortingOptions.PriceHighToLow;

    const result = offersData.reducer(initialState, setFilterType(expectedFilterType));

    expect(result.filterType).toBe(expectedFilterType);
  });

  it('should set city to expectedOffers', () => {
    const initialState = {
      offers: [],
      city: INITIAL_CITY,
      filterType: INITIAL_FILTER_TYPE,
      isLoading: false,
      error: '',
    };

    const expectedOffers = createFakeOffers(true);

    const result = offersData.reducer(initialState, setOffers(expectedOffers));

    expect(result.offers).toBe(expectedOffers);
  });

  it('should set isLoading to true on fetchOffers.pending', () => {
    const expectedStatus = true;

    const result = offersData.reducer(undefined, fetchOffers.pending);

    expect(result.isLoading).toBe(expectedStatus);
  });

  it('should set error to undefined on fetchOffers.rejected', () => {
    const expectedStatus = undefined;

    const result = offersData.reducer(undefined, fetchOffers.rejected);

    expect(result.error).toBe(expectedStatus);
  });
});
