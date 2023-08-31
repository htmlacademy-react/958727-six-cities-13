import { createSelector } from '@reduxjs/toolkit';
import { NameSpace, REVIEWS_QUANTITY } from '../../const';
import { ReviewType } from '../../types/review';
import {State} from '../../types/state';
import { sortReviews } from '../../helpers/sort-reviews';

export const getReviews = (state: Pick<State, typeof NameSpace.Reviews>): ReviewType[] => state[NameSpace.Reviews].reviews;
export const getReviewsError = (state: Pick<State, typeof NameSpace.Reviews>): string | undefined => state[NameSpace.Reviews].reviewsError;
export const getIsReviewsLoading = (state: Pick<State, typeof NameSpace.Reviews>): boolean => state[NameSpace.Reviews].isLoading;
export const getIsReviewSending = (state: Pick<State, typeof NameSpace.Reviews>): boolean => state[NameSpace.Reviews].isSending;
export const getSortedReviews = createSelector(
  getReviews,
  (reviews) => sortReviews([...reviews]).slice(0,REVIEWS_QUANTITY)
);
