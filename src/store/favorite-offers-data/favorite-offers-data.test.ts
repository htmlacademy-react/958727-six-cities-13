import {expect} from 'vitest';
import { favoriteOffersData } from './favorite-offers-data';
import { createFakeOffers } from '../../utils/mocks/create-fake-offers';
import { fetchFavoriteOffers } from '../api-actions';

vi.mock('../root-reducer', () => ({ rootReducer: vi.fn() }));

describe('favoriteOffersSlice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      favoriteOffers: null,
      isLoading: false,
      error: '',
    };

    const result = favoriteOffersData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  describe('fetchFavoriteOffers', () => {
    it('should load array of favoriteOffers', () => {
      const mockOffers = createFakeOffers(true);
      const expectedState = {
        favoriteOffers: mockOffers,
        isLoading: false,
        error: '',
      };

      const result = favoriteOffersData.reducer(undefined, fetchFavoriteOffers.fulfilled(mockOffers, '', undefined));

      expect(result).toEqual(expectedState);
    });

    it('should set isLoading to true on fetchFavoriteOffers.pending', () => {
      const expectedStatus = true;

      const result = favoriteOffersData.reducer(undefined, fetchFavoriteOffers.pending);

      expect(result.isLoading).toBe(expectedStatus);
    });

    it('should set error to undefined on fetchFavoriteOffers.rejected', () => {
      const expectedStatus = undefined;

      const result = favoriteOffersData.reducer(undefined, fetchFavoriteOffers.rejected);

      expect(result.error).toBe(expectedStatus);
    });
  });
});
