import { PlaceCardType } from '../../types/place-card';
import { store } from '../index';

export type offersDataType = {
    city: string;
    offers: PlaceCardType[];
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
