import { createAsyncThunk } from '@reduxjs/toolkit';
import { PlaceCardType } from '../types/place-card';
import { ThunkConfig } from '../types/state';
import { APIRoute, AppRoute } from '../const';
import { AuthType } from '../types/auth';
import { dropToken, saveToken } from '../helpers/token';
import { redirectToRoute } from './action';
import { UserDataType } from '../types/user-data';

export const fetchOffers = createAsyncThunk<
    PlaceCardType[],
    undefined,
    ThunkConfig<string>
    >(
      'articleDetailed/fetchArticleById',
      async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
          const response = await extra.api.get<PlaceCardType[]>(APIRoute.Offers);

          if (!response.data) {
            throw new Error();
          }

          return response.data;
        } catch (e) {
          return rejectWithValue('error');
        }
      },
    );

export const fetchAuth = createAsyncThunk<void, undefined, ThunkConfig<string>
>(
  'user/checkAuth',
  async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      await extra.api.get(APIRoute.Login);
    }catch (e) {
      return rejectWithValue('error');
    }
  },
);

export const fetchLogin = createAsyncThunk<void, AuthType, ThunkConfig<string>>(
  'user/login',
  async ({login: email, password}, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;
    try {
      const {data} = await extra.api.post<UserDataType>(APIRoute.Login, {email, password});
      if (!data) {
        throw new Error();
      }
      const {token, ...restData} = data;
      if (token) {
        saveToken(token);
      }
      dispatch(redirectToRoute(AppRoute.Root));

      return restData;
    } catch(e) {
      return rejectWithValue('error');
    }
  },
);

export const fetchLogout = createAsyncThunk<void, undefined, ThunkConfig<string>>(
  'user/logout',
  async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      await extra.api.delete(APIRoute.Logout);
      dropToken();
    } catch(e) {
      return rejectWithValue('error');
    }
  },
);
