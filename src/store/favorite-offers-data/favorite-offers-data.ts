import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {FavoriteOffersDataType} from '../../types/state';
import { PlaceCardType } from '../../types/place-card';
import { fetchFavoriteOffers } from '../api-actions';

const initialState: FavoriteOffersDataType = {
  favoriteOffers: null,
  isLoading: false,
  error: '',
};

export const favoriteOffersData = createSlice({
  name: NameSpace.FavoriteOffers,
  initialState,
  reducers: {
    updateFavorites: (state, action: PayloadAction<PlaceCardType[]>) => {
      state.favoriteOffers = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action: PayloadAction<PlaceCardType[]>) => {
        state.isLoading = false;
        state.favoriteOffers = action.payload;
      })
      .addCase(fetchFavoriteOffers.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {updateFavorites} = favoriteOffersData.actions;
