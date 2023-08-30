import { NameSpace } from '../../const';
import { PlaceCardType } from '../../types/place-card';
import {State} from '../../types/state';

export const getFavoriteOffers = (state: State): PlaceCardType[] | null => state[NameSpace.FavoriteOffers].favoriteOffers;
export const getIsFavoriteOffersLoading = (state: State): boolean => state[NameSpace.FavoriteOffers].isLoading;
