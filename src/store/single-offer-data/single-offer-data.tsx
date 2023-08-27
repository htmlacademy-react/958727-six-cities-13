import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {fetchSingleOffer} from '../api-actions';
import { SingleOfferDataType } from '../../types/state';
import { OfferCardType } from '../../types/offer-card';

const initialState: SingleOfferDataType = {
  singleOffer: null,
  isLoading: false,
  error: ''
};

export const singleOfferData = createSlice({
  name: NameSpace.SingleOffer,
  initialState,
  reducers: {
    setSingleOffer: (state, action: PayloadAction<OfferCardType>) => {
      state.singleOffer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleOffer.fulfilled, (state, action: PayloadAction<OfferCardType>) => {
        state.singleOffer = action.payload;
        state.error = '';
        state.isLoading = false;
      })
      .addCase(fetchSingleOffer.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSingleOffer.pending, (state) => {
        state.isLoading = true;
      });
  }
});

export const {setSingleOffer} = singleOfferData.actions;
