import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './root-reducer';
import { api } from '../api/api';
import { ThunkExtraArg } from '../types/state';
import { redirect } from './middlewares/redirect';
const extraArg: ThunkExtraArg = {
  api,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: extraArg,
    },
  }).concat(redirect)
});
