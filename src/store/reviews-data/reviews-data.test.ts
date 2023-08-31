import {expect} from 'vitest';
import { fetchPostReview, fetchReviews } from '../api-actions';
import { reviewsData } from './reviews-data';
import { createFakeReview, createFakeReviews } from '../../utils/mocks/create-fake-reviews';


vi.mock('../root-reducer', () => ({ rootReducer: vi.fn() }));

describe('reviewsData', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      reviews: [],
      isLoading: false,
      isSending: false,
      reviewsError: '',
      sendReviewError: '',
    };

    const result = reviewsData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      reviews: [],
      isLoading: false,
      isSending: false,
      reviewsError: '',
      sendReviewError: '',
    };

    const result = reviewsData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});

describe('fetchReviews', () => {
  it('should load array of reviews on fetchReviews.fulfilled', () => {

    const mockReviews = createFakeReviews();

    const expectedState = {
      reviews: mockReviews,
      isLoading: false,
      isSending: false,
      reviewsError: '',
      sendReviewError: '',
    };

    const result = reviewsData.reducer(undefined, fetchReviews.fulfilled(mockReviews, '', 'comment'));

    expect(result).toEqual(expectedState);
  });

  it('fetchReviews isLoading should be equal true on fetchReviews.pending', () => {
    const expectedStatus = true;

    const result = reviewsData.reducer(undefined, fetchReviews.pending);

    expect(result.isLoading).toBe(expectedStatus);
  });

  it('reviewsError of fetchReviews should be equal undefined on fetchReviews.rejected', () => {
    const expectedStatus = undefined;

    const result = reviewsData.reducer(undefined, fetchReviews.rejected);

    expect(result.reviewsError).toBe(expectedStatus);
  });
});

describe('fetchPostReview', () => {
  it('should load array of reviews on fetchReviews.fulfilled', () => {

    const mockReviews = createFakeReviews();
    const mockReview = createFakeReview();
    const reviewArguments = {
      id: mockReview.id,
      reviewData: {
        rating: mockReview.rating,
        comment: mockReview.comment
      }
    };

    const initialState = {
      reviews: mockReviews,
      isLoading: false,
      isSending: false,
      reviewsError: '',
      sendReviewError: '',
    };

    const updatedMockRweviews = [...mockReviews];
    updatedMockRweviews.unshift(mockReview);

    const result = reviewsData.reducer(initialState, fetchPostReview.fulfilled(mockReview, '', reviewArguments));

    expect(result.reviews).toEqual(updatedMockRweviews);
  });

  it('fetchReviews isSending should be equal true on fetchPostReview.pending', () => {
    const expectedStatus = true;

    const result = reviewsData.reducer(undefined, fetchPostReview.pending);

    expect(result.isSending).toBe(expectedStatus);
  });

  it('sendReviewError of fetchPostReview should be equal undefined on fetchPostReview.rejected', () => {
    const expectedStatus = undefined;

    const result = reviewsData.reducer(undefined, fetchPostReview.rejected);

    expect(result.sendReviewError).toBe(expectedStatus);
  });
});
