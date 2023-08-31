import {expect} from 'vitest';
import { createFakeOffers } from '../../utils/mocks/create-fake-offers';
import { fetchNearbyOffers } from '../api-actions';
import { nearbyOffersData } from './nearby-offers-data';

vi.mock('../root-reducer', () => ({ rootReducer: vi.fn() }));

describe('nearbyOffersData', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      nearbyOffers: [],
      isLoading: false,
      error: '',
    };

    const result = nearbyOffersData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  describe('fetchNearbyOffers', () => {
    it('should load array of nearbyOffers', () => {
      const mockOffers = createFakeOffers(true);
      const expectedState = {
        nearbyOffers: mockOffers,
        isLoading: false,
        error: '',
      };

      const result = nearbyOffersData.reducer(undefined, fetchNearbyOffers.fulfilled(mockOffers, '', ''));

      expect(result).toEqual(expectedState);
    });

    it('should set isLoading to true on fetchNearbyOffers.pending', () => {
      const expectedStatus = true;

      const result = nearbyOffersData.reducer(undefined, fetchNearbyOffers.pending);

      expect(result.isLoading).toBe(expectedStatus);
    });

    it('should set error to undefined on fetchNearbyOffers.rejected', () => {
      const expectedStatus = undefined;

      const result = nearbyOffersData.reducer(undefined, fetchNearbyOffers.rejected);

      expect(result.error).toBe(expectedStatus);
    });
  });
});
