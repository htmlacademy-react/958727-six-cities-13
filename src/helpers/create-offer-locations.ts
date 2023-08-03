import { LocationItemType } from '../types/location';
import { PlaceCardType } from '../types/place-card';

export const createOfferLocations = (offers: PlaceCardType[]): LocationItemType[] => offers.map((offer) => ({
  id: offer.id,
  location: offer.location
}));
