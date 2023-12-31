import { createSelector } from '@reduxjs/toolkit';
import { NameSpace, OffersDefaultQuantities } from '../../const';
import { shuffleArray } from '../../helpers/shuffle-array';
import { PlaceCardType } from '../../types/place-card';
import {State} from '../../types/state';

export const getNearbyOffers = (state: Pick<State, typeof NameSpace.NearbyOffers>): PlaceCardType[] => state[NameSpace.NearbyOffers].nearbyOffers;
export const getIsNearbyOffersLoading = (state: Pick<State, typeof NameSpace.NearbyOffers>): boolean => state[NameSpace.NearbyOffers].isLoading;
export const getSortedNearbyOffers = createSelector(
  getNearbyOffers,
  (offers) => shuffleArray<PlaceCardType>([...offers]).slice(0,OffersDefaultQuantities.NearbyPlaces)
);
