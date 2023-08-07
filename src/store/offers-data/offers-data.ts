import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Cities, INITIAL_CITY, INITIAL_FILTER_TYPE, NameSpace, SortingOptions} from '../../const';
import {OffersDataType} from '../../types/state';
import { PlaceCardType } from '../../types/place-card';
import { fetchOffers } from './fetch-offers';

const initialState: OffersDataType = {
  offers: [],
  city: INITIAL_CITY,
  filterType: INITIAL_FILTER_TYPE,
  isLoading: true,
  error: undefined,

};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setOffers: (state, action: PayloadAction<PlaceCardType[]>) => {
      state.offers = action.payload;
    },
    setCity: (state, action: PayloadAction<Cities>) => {
      state.city = action.payload;
    },
    setFilterType: (state, action: PayloadAction<SortingOptions>) => {
      state.filterType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action: PayloadAction<PlaceCardType[]>) => {
        state.isLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const {setOffers, setCity, setFilterType} = offersData.actions;
