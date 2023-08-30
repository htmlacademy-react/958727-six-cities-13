import { createSelector } from '@reduxjs/toolkit';
import { NameSpace, REVIEWS_QUANTITY } from '../../const';
import { ReviewType } from '../../types/review';
import {State} from '../../types/state';
import { sortReviews } from '../../helpers/sort-reviews';

export const getReviews = (state: State): ReviewType[] => state[NameSpace.Reviews].reviews;
export const getReviewsError = (state: State): string | undefined => state[NameSpace.Reviews].getReviewsError;
export const getIsReviewsLoading = (state: State): boolean => state[NameSpace.Reviews].isLoading;
export const getIsReviewSending = (state: State): boolean => state[NameSpace.Reviews].isSending;
export const getSortedReviews = createSelector(
  getReviews,
  (reviews) => sortReviews([...reviews]).slice(0,REVIEWS_QUANTITY)
);
