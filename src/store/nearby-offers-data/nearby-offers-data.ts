import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {NearbyOffersDataType} from '../../types/state';
import { PlaceCardType } from '../../types/place-card';
import { fetchNearbyOffers } from '../api-actions';

const initialState: NearbyOffersDataType = {
  nearbyOffers: [],
  isLoading: false,
  error: undefined,
};

export const nearbyOffersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNearbyOffers.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action: PayloadAction<PlaceCardType[]>) => {
        state.isLoading = false;
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchNearbyOffers.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
