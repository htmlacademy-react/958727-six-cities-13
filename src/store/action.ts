import {createAction} from '@reduxjs/toolkit';
import { PlaceCardType } from '../types/place-card';

export const changeCity = createAction<string, 'offers/changeCity'>('offers/changeCity');
export const addOffers = createAction<PlaceCardType[], 'offers/addOffers'>('offers/addOffers');
