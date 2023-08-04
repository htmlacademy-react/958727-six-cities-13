import { Cities, SortingOptions } from '../const.js';
import {store} from '../store/index.js';
import { PlaceCardType } from './place-card.js';

export type OffersDataType = {
    offers: PlaceCardType[];
    city: Cities;
    filterType: SortingOptions;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
