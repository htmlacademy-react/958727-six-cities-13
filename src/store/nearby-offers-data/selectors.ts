import { createSelector } from '@reduxjs/toolkit';
import { NEARBY_PLACES_QUANTITY, NameSpace } from '../../const';
import { shuffleArray } from '../../helpers/shuffle-array';
import { PlaceCardType } from '../../types/place-card';
import {State} from '../../types/state';

export const getNearbyOffers = (state: State): PlaceCardType[] => state[NameSpace.NearbyOffers].nearbyOffers;
export const getIsNearbyOffersLoading = (state: State): boolean => state[NameSpace.NearbyOffers].isLoading;
export const getSortedNearbyOffers = createSelector(
  getNearbyOffers,
  (offers) => shuffleArray<PlaceCardType>([...offers]).slice(0,NEARBY_PLACES_QUANTITY)
);
