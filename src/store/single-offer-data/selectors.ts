import { NameSpace } from '../../const';
import { OfferCardType } from '../../types/offer-card';
import {State} from '../../types/state';

export const getSingleOffer = (state: Pick<State, typeof NameSpace.SingleOffer>): OfferCardType | null => state[NameSpace.SingleOffer].singleOffer;
export const getIsSingleOfferLoading = (state: Pick<State, typeof NameSpace.SingleOffer>): boolean => state[NameSpace.SingleOffer].isLoading;

