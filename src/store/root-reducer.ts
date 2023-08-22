import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import { offersData } from './offers-data/offers-data';
import { userProcess } from './user-process/user-process';
import { singleOfferData } from './single-offer-data/single-offer-data';
import { reviewsData } from './reviews-data/reviews-data';
import { nearbyOffersData } from './nearby-offers-data/nearby-offers-data';
import { favoriteOffersData } from './favorite-offers-data/favorite-offers-data';

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.SingleOffer]: singleOfferData.reducer,
  [NameSpace.Reviews]: reviewsData.reducer,
  [NameSpace.NearbyOffers]: nearbyOffersData.reducer,
  [NameSpace.FavoriteOffers]: favoriteOffersData.reducer,
});
