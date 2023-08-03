export enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  Root = '/',
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
  popular = 'Popular',
  priceLowToHigh = 'Price: low to high',
  priceHighToLow = 'Price: high to low',
  topRatedFirst = 'Top rated first',
}

export enum NameSpace {
  Offers = 'OFFERS',
}

export enum Cities {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export const URL_PIN_DEFAULT = 'src/assets/icons/pin.svg';

export const URL_PIN_CURRENT = 'src/assets/icons/pin-active.svg';
export const LAYER_TYPE_URL =
'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
export const LAYER_ATTRIBUTION =
'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
export const RATING_AMPLIFIER = 20;

export const INITIAL_CITY = 'Paris';


