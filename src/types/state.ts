import { AuthorizationStatus, Cities, SortingOptions } from '../const.js';
import { store } from '../store/index.js';
import { PlaceCardType } from './place-card.js';
import { AxiosInstance } from 'axios';
import { UserDataType } from './user-data.js';
import { OfferCardType } from './offer-card.js';
import { ReviewType } from './review.js';

export type OffersDataType = {
    offers: PlaceCardType[];
    city: Cities;
    filterType: SortingOptions;
    isLoading: boolean;
    error?: string;
};

export type SingleOfferDataType = {
    singleOffer: OfferCardType | null;
    isLoading: boolean;
    error?: string;
}

export type ReviewsDataType = {
    reviews: ReviewType[];
    isLoading: boolean;
    isSending: boolean;
    reviewsError?: string;
    sendReviewError?: string;
}

export type NearbyOffersDataType = {
    nearbyOffers: PlaceCardType[];
    isLoading: boolean;
    error?: string;
}

export type FavoriteOffersDataType = {
    favoriteOffers: PlaceCardType[] | null;
    isLoading: boolean;
    error?: string;
}

export type UserProcessType = {
    authorizationStatus: AuthorizationStatus;
    userData: UserDataType;
  };


export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ThunkExtraArg = {
    api: AxiosInstance;
}


export type ThunkConfig<T> = {
    rejectValue: T;
    extra: ThunkExtraArg;
    dispatch: AppDispatch;
    state: State;
}
