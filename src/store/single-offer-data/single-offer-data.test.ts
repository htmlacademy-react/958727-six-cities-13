import {expect} from 'vitest';
import { createFakeOffer } from '../../utils/mocks/create-fake-offer';
import { fetchSingleOffer } from '../api-actions';
import { singleOfferData } from './single-offer-data';

vi.mock('../root-reducer', () => ({ rootReducer: vi.fn() }));

describe('singleOfferData', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      singleOffer: null,
      isLoading: false,
      error: '',
    };

    const result = singleOfferData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  describe('fetchSingleOffer', () => {
    it('should load singleOffer', () => {
      const mockOffer = createFakeOffer();
      const expectedState = {
        singleOffer: mockOffer,
        isLoading: false,
        error: '',
      };

      const result = singleOfferData.reducer(undefined, fetchSingleOffer.fulfilled(mockOffer, '', ''));

      expect(result).toEqual(expectedState);
    });

    it('should set isLoading to true on fetchSingleOffer.pending', () => {
      const expectedStatus = true;

      const result = singleOfferData.reducer(undefined, fetchSingleOffer.pending);

      expect(result.isLoading).toBe(expectedStatus);
    });

    it('should set error to undefined on fetchSingleOffer.rejected', () => {
      const expectedStatus = undefined;

      const result = singleOfferData.reducer(undefined, fetchSingleOffer.rejected);

      expect(result.error).toBe(expectedStatus);
    });
  });
});
