import { AuthorizationStatus, Cities, SortingOptions } from '../const.js';
import { store } from '../store/index.js';
import { PlaceCardType } from './place-card.js';
import { AxiosInstance } from 'axios';
import { UserDataType } from './user-data.js';

export type OffersDataType = {
    offers: PlaceCardType[];
    city: Cities;
    filterType: SortingOptions;
    isLoading: boolean;
    error?: string;
};

export type UserProcess = {
    authorizationStatus: AuthorizationStatus;
    userData: UserDataType;
  };

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ThunkExtraArg = {
    api: AxiosInstance;
}


export type ThunkConfig<T> = {
    rejectValue: T;
    extra: ThunkExtraArg;
    dispatch: AppDispatch;
    state: State;
}
