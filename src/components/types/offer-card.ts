import { OfferBaseType } from './place-card';

export type Host = {
    name: string;
    avatarUrl: string;
    isPro: boolean;
}

export type OfferCardType = OfferBaseType & {
    description: string;
    bedrooms: number;
    goods: string[];
    host: Host;
    images: string[];
    maxAdults: number;
}
