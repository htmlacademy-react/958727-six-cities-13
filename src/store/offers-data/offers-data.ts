import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Cities, INITIAL_CITY, INITIAL_FILTER_TYPE, NameSpace, SortingOptions} from '../../const';
import {OffersDataType} from '../../types/state';
import { offers } from '../../mocks/offers';
import { PlaceCardType } from '../../types/place-card';

const initialState: OffersDataType = {
  offers: offers,
  city: INITIAL_CITY,
  filterType: INITIAL_FILTER_TYPE,
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
});

export const {setOffers, setCity, setFilterType} = offersData.actions;
