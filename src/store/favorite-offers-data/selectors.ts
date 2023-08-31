import { NameSpace } from '../../const';
import { PlaceCardType } from '../../types/place-card';
import {State} from '../../types/state';

export const getFavoriteOffers = (state: Pick<State, typeof NameSpace.FavoriteOffers>): PlaceCardType[] | null => state[NameSpace.FavoriteOffers].favoriteOffers;
export const getIsFavoriteOffersLoading = (state: Pick<State, typeof NameSpace.FavoriteOffers>): boolean => state[NameSpace.FavoriteOffers].isLoading;
