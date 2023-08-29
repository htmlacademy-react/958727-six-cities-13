import { HostType } from './host';
import { PlaceCardType } from './place-card';

export type OfferCardType = Omit<PlaceCardType, 'previewImage'> & {
    description: string;
    bedrooms: number;
    goods: string[];
    host: HostType;
    images: string[];
    maxAdults: number;
    previewImage?: string;
}
