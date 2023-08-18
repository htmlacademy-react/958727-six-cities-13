import { createAsyncThunk } from '@reduxjs/toolkit';
import { PlaceCardType } from '../types/place-card';
import { ThunkConfig } from '../types/state';
import { APIRoute, AppRoute, nearbyOffersAbortController, reviewsAbortController, singleOfferAbortController } from '../const';
import { AuthType } from '../types/auth';
import { dropToken, saveToken } from '../helpers/token';
import { redirectToRoute } from './action';
import { UserDataType } from '../types/user-data';
import { OfferCardType } from '../types/offer-card';
import { PostReviewType, ReviewType } from '../types/review';
import { toast } from 'react-toastify';

export const fetchOffers = createAsyncThunk<
    PlaceCardType[],
    undefined,
    ThunkConfig<string>
    >(
      'offers/fetchArticleById',
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

export const fetchLogin = createAsyncThunk<UserDataType, AuthType, ThunkConfig<string>>(
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

export const fetchSingleOffer = createAsyncThunk<
    OfferCardType,
    PlaceCardType['id'],
    ThunkConfig<string>
    >(
      'offer/fetchSingleOffer',
      async (id, thunkApi) => {
        const { extra, rejectWithValue, dispatch } = thunkApi;

        try {
          const response = await extra.api.get<OfferCardType>(`${APIRoute.Offers}/${id}`);

          if (!response.data) {
            throw new Error();
          }

          return response.data;
        } catch (e) {
          dispatch(redirectToRoute(AppRoute.NotFound));
          return rejectWithValue('error');
        }
      },
    );

export const fetchReviews = createAsyncThunk<
    ReviewType[],
    PlaceCardType['id'],
    ThunkConfig<string>
    >(
      'offer/fetchReviews',
      async (id, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
          const response = await extra.api.get<ReviewType[]>(`${APIRoute.Reviews}/${id}`);

          if (!response.data) {
            throw new Error();
          }

          return response.data;
        } catch (e) {
          return rejectWithValue('error');
        }
      },
    );

export const fetchPostReview = createAsyncThunk<
    ReviewType[],
    {
      reviewData: PostReviewType;
      id: PlaceCardType['id'];
    },
    ThunkConfig<string>
    >(
      'offer/fetchPostReview',
      async ({reviewData, id}, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
          const response = await extra.api.post<ReviewType[]>(
            `${APIRoute.Reviews}/${id}`,
            reviewData
          );

          if (!response.data) {
            throw new Error();
          }
          toast.success('Your comment saved successfully!');
          return response.data;
        } catch (e) {
          return rejectWithValue('error');
        }
      },
    );

export const fetchNearbyOffers = createAsyncThunk<
    PlaceCardType[],
    PlaceCardType['id'],
    ThunkConfig<string>
    >(
      'offer/fetchNearbyOffers',
      async (id, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
          const response = await extra.api.get<PlaceCardType[]>(`${APIRoute.Offers}/${id}/nearby`);

          if (!response.data) {
            throw new Error();
          }

          return response.data;
        } catch (e) {
          return rejectWithValue('error');
        }
      },
    );
