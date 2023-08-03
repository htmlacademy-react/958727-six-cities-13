import {store} from '../store/index.js';
import { PlaceCardType } from './place-card.js';

export type OffersDataType = {
    offers: PlaceCardType[];
    city: string;

};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
