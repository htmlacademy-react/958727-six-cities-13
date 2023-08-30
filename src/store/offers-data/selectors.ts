import { NameSpace, SortingOptions } from '../../const';
import { sortCards } from '../../helpers/sort-cards';
import { PlaceCardType } from '../../types/place-card';
import {State} from '../../types/state';
import { createSelector } from '@reduxjs/toolkit';

export const getOffers = (state: State): PlaceCardType[] => state[NameSpace.Offers].offers;
export const getCity = (state: State): string => state[NameSpace.Offers].city;
export const getFilterType = (state: State): SortingOptions => state[NameSpace.Offers].filterType;
export const getIsOffersLoading = (state: State): boolean => state[NameSpace.Offers].isLoading;
export const getSortedCards = createSelector(
  getOffers,
  getFilterType,
  getCity,
  (offers, filter, city) => sortCards([...offers], filter).filter((card) => card.city.name === city)
);
