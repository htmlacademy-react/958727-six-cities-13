import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {FavoriteSingleOfferDataType} from '../../types/state';
import { fetchFavorite } from '../api-actions';
import { OfferCardType } from '../../types/offer-card';

const initialState: FavoriteSingleOfferDataType = {
  favoriteSingleOffer: null,
  isLoading: false,
  error: '',
};

export const favoriteSingleOfferData = createSlice({
  name: NameSpace.FavoriteSingleOffer,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorite.fulfilled, (state, action: PayloadAction<OfferCardType>) => {
        state.isLoading = false;
        state.favoriteSingleOffer = action.payload;
      })
      .addCase(fetchFavorite.pending, (state) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(fetchFavorite.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
