import { PlaceCardType } from './place-card';

export type Host = {
    name: string;
    avatarUrl: string;
    isPro: boolean;
}

export type OfferCardType = Omit<PlaceCardType, 'previewImage'> & {
    description: string;
    bedrooms: number;
    goods: string[];
    host: Host;
    images: string[];
    maxAdults: number;
}
