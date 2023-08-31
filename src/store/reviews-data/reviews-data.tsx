import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {fetchPostReview, fetchReviews} from '../api-actions';
import { ReviewsDataType } from '../../types/state';
import { ReviewType } from '../../types/review';

const initialState: ReviewsDataType = {
  reviews: [],
  isLoading: false,
  isSending: false,
  reviewsError: '',
  sendReviewError: '',
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.fulfilled, (state, action: PayloadAction<ReviewType[]>) => {
        state.reviews = action.payload;
        state.reviewsError = '';
        state.isLoading = false;
      })
      .addCase(fetchReviews.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.reviewsError = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPostReview.fulfilled, (state, action: PayloadAction<ReviewType>) => {
        state.reviews.unshift(action.payload);
        state.sendReviewError = '';
        state.isSending = false;
      })
      .addCase(fetchPostReview.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.sendReviewError = action.payload;
        state.isSending = false;
      })
      .addCase(fetchPostReview.pending, (state) => {
        state.isSending = true;
      });
  }
});
