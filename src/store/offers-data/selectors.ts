import { NameSpace, SortingOptions } from '../../const';
import { sortCards } from '../../helpers/sort-cards';
import { PlaceCardType } from '../../types/place-card';
import {State} from '../../types/state';
import { createSelector } from '@reduxjs/toolkit';

export const getOffers = (state: Pick<State, typeof NameSpace.Offers>): PlaceCardType[] => state[NameSpace.Offers].offers;
export const getCity = (state: Pick<State, typeof NameSpace.Offers>): string => state[NameSpace.Offers].city;
export const getFilterType = (state: Pick<State, typeof NameSpace.Offers>): SortingOptions => state[NameSpace.Offers].filterType;
export const getIsOffersLoading = (state: Pick<State, typeof NameSpace.Offers>): boolean => state[NameSpace.Offers].isLoading;
export const getSortedCards = createSelector(
  getOffers,
  getFilterType,
  getCity,
  (offers, filter, city) => sortCards([...offers], filter).filter((card) => card.city.name === city)
);
