import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {changeCity, addOffers} from './action';
import { offersDataType } from './types/types';
import { PlaceCardType } from '../types/place-card';


const initialState: offersDataType = {
  city: 'Paris',
  offers: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    })
    .addCase(addOffers, (state, action: PayloadAction<PlaceCardType[]>) => {
      state.offers = action.payload;
    });
});

export {reducer};
