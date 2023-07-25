import { NameSpace } from '../../const';
import { PlaceCardType } from '../../types/place-card';
import {State} from '../../types/state';

export const getOffers = (state: State): PlaceCardType[] => state[NameSpace.Offers].offers;
export const getCity = (state: State): string => state[NameSpace.Offers].city;
