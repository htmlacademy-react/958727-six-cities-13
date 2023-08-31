import {StatusCodes} from 'http-status-codes';

export enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  Root = '/',
  NotFound = '/not-found'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const RatingTitles = [
  'perfect',
  'good',
  'not bad',
  'badly',
  'terribly'
] as const;

export enum ReviewLength {
  Min = 50,
  Max = 300,
}

export enum SortingOptions {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export enum NameSpace {
  Offers = 'OFFERS',
  SingleOffer = 'SINGLE_OFFER',
  User = 'USER',
  Reviews = 'REVIEWS',
  NearbyOffers = 'NEARBY_OFFERS',
  FavoriteOffers = 'FAVORITE_OFFERS',
  FavoriteSingleOffer = 'FAVORITE_SINGLE_OFFER',
}

export enum Cities {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Reviews = '/comments',
  NearbyOffers = '/nearby',
  Favorite = '/favorite'
}

export enum FavoriteStatus {
  IsInFavorite = 1,
  IsNotInFavorite = 0,
}

export enum OffersDefaultQuantities {
  NearbyPlaces = 3,
  Reviews = 10,
}

export const StatusCodeMap: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
  [StatusCodes.INTERNAL_SERVER_ERROR]: true,
};

export const LoginFormRegex = {
  Email: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
  Password: /(?=.*?[0-9])(?=.*?[A-Za-z]).+/,
} as const;

export const URL_PIN_DEFAULT = 'src/assets/icons/pin.svg';
export const URL_PIN_CURRENT = 'src/assets/icons/pin-active.svg';
export const LAYER_TYPE_URL =
'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
export const LAYER_ATTRIBUTION =
'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
export const RATING_AMPLIFIER = 20;

export const INITIAL_CITY = Cities.Paris;
export const INITIAL_FILTER_TYPE = SortingOptions.Popular;
export const BASE_URL = 'https://13.design.pages.academy/six-cities';
export const REQUEST_TIMEOUT = 5000;
export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
