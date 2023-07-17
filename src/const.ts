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
];

export enum ReviewLength {
  Min = 50,
  Max = 300,
}
