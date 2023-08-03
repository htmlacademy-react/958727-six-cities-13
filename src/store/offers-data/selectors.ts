import { NameSpace } from '../../const';
import { PlaceCardType } from '../../types/place-card';
import {State} from '../../types/state';
import { createSelector } from '@reduxjs/toolkit';

export const getOffers = (state: State): PlaceCardType[] => state[NameSpace.Offers].offers;
export const getCity = (state: State): string => state[NameSpace.Offers].city;
export const getFilteredCards = createSelector(
  getOffers,
  getCity,
  (offers, city) => offers.filter((card) => card.city.name === city)
);
