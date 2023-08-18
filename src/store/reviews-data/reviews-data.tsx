import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {fetchReviews} from '../api-actions';
import { ReviewsDataType } from '../../types/state';
import { ReviewType } from '../../types/review';

const initialState: ReviewsDataType = {
  reviews: [],
  isLoading: false,
  error: ''
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.fulfilled, (state, action: PayloadAction<ReviewType[]>) => {
        state.reviews = action.payload;
        state.error = '';
        state.isLoading = false;
      })
      .addCase(fetchReviews.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchReviews.pending, (state) => {
        state.isLoading = true;
      });
  }
});
