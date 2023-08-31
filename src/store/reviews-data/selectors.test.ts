import { NameSpace } from '../../const';
import { getReviews, getIsReviewsLoading, getIsReviewSending, getReviewsError } from './selectors';
import { createFakeReviews } from '../../utils/mocks/create-fake-reviews';

describe('Reviews selectors', () => {
  const state = {
    [NameSpace.Reviews]: {
      reviews: createFakeReviews(),
      isLoading: false,
      isSending: false,
      reviewsError: '',
      sendReviewError: '',
    }
  };

  it('should return reviews data from state', () => {
    const { reviews } = state[NameSpace.Reviews];
    const result = getReviews(state);
    expect(result).toEqual(reviews);
  });

  it('should return error data from state', () => {
    const { reviewsError } = state[NameSpace.Reviews];
    const result = getReviewsError(state);
    expect(result).toEqual(reviewsError);
  });

  it('should return reviews loading status from state', () => {
    const { isLoading } = state[NameSpace.Reviews];
    const result = getIsReviewsLoading(state);
    expect(result).toEqual(isLoading);
  });

  it('should return review sending status from state', () => {
    const { isSending } = state[NameSpace.Reviews];
    const result = getIsReviewSending(state);
    expect(result).toEqual(isSending);
  });
});
