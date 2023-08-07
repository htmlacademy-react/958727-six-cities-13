import { Cities, SortingOptions } from '../const.js';
import { store } from '../store/index.js';
import { PlaceCardType } from './place-card.js';
import { AxiosInstance } from 'axios';

export type OffersDataType = {
    offers: PlaceCardType[];
    city: Cities;
    filterType: SortingOptions;
    isLoading: boolean;
    error?: string;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ThunkExtraArg = {
    api: AxiosInstance;
}


export type ThunkConfig<T> = {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: State;
}
