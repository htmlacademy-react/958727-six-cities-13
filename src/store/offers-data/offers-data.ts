import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {INITIAL_CITY, NameSpace} from '../../const';
import {OffersDataType} from '../../types/state';
import { offers } from '../../mocks/offers';
import { PlaceCardType } from '../../types/place-card';

const initialState: OffersDataType = {
  offers: offers,
  city: INITIAL_CITY,
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setOffers: (state, action: PayloadAction<PlaceCardType[]>) => {
      state.offers = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
  },
});

export const {setOffers, setCity} = offersData.actions;
