import { NameSpace } from '../../const';
import { PlaceCardType } from '../../types/place-card';
import {State} from '../../types/state';

export const getFavoriteOffers = (state: State): PlaceCardType[] => state[NameSpace.FavoriteOffers].favoriteOffers;
export const getFavoriteOffersError = (state: State): string | undefined => state[NameSpace.FavoriteOffers].error;
export const getIsFavoriteOffersLoading = (state: State): boolean => state[NameSpace.FavoriteOffers].isLoading;
