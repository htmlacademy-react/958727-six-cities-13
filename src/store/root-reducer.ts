import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import { offersData } from './offers-data/offers-data';

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offersData.reducer,
});
