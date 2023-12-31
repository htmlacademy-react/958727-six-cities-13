import { createAsyncThunk } from '@reduxjs/toolkit';
import { PlaceCardType } from '../types/place-card';
import { ThunkConfig } from '../types/state';
import { APIRoute, AppRoute, FavoriteStatus } from '../const';
import { AuthType } from '../types/auth';
import { dropToken, saveToken } from '../helpers/token';
import { redirectToRoute } from './action';
import { UserDataType } from '../types/user-data';
import { OfferCardType } from '../types/offer-card';
import { PostReviewType, ReviewType } from '../types/review';
import { toast } from 'react-toastify';
import { manageResponseError } from './helpers/manage-response-error';
import { getOffers } from './offers-data/selectors';
import { setSingleOffer } from './single-offer-data/single-offer-data';
import { setOffers } from './offers-data/offers-data';
import { getFavoriteOffers } from './favorite-offers-data/selectors';
import { updateFavorites } from './favorite-offers-data/favorite-offers-data';

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
        } catch (error) {
          return rejectWithValue(manageResponseError(error));
        }
      },
    );

export const fetchAuth = createAsyncThunk<UserDataType, undefined, ThunkConfig<string>
>(
  'user/checkAuth',
  async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const {data} = await extra.api.get<UserDataType>(APIRoute.Login);
      return data;
    } catch (error) {
      return rejectWithValue(manageResponseError(error));
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
    } catch (error) {
      return rejectWithValue(manageResponseError(error));
    }
  },
);

export const fetchLogout = createAsyncThunk<void, undefined, ThunkConfig<string>>(
  'user/logout',
  async (_, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;
    try {
      await extra.api.delete(APIRoute.Logout);
      dispatch(updateFavorites(null));
      dropToken();
    } catch (error) {
      return rejectWithValue(manageResponseError(error));
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
        } catch (error) {
          return rejectWithValue(manageResponseError(error));
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
        } catch (error) {
          return rejectWithValue(manageResponseError(error));
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
          dispatch(fetchNearbyOffers(id));
          dispatch(fetchReviews(id));
          return response.data;
        } catch (error) {
          dispatch(redirectToRoute(AppRoute.NotFound));
          return rejectWithValue(manageResponseError(error));
        }
      },
    );

export const fetchPostReview = createAsyncThunk<
    ReviewType,
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
          const response = await extra.api.post<ReviewType>(
            `${APIRoute.Reviews}/${id}`,
            reviewData
          );

          if (!response.data) {
            throw new Error();
          }
          toast.success('Your comment saved successfully!');

          return response.data;
        } catch (error) {
          return rejectWithValue(manageResponseError(error));
        }
      },
    );

export const fetchFavoriteOffers = createAsyncThunk<
    PlaceCardType[],
    undefined,
    ThunkConfig<string>
    >(
      'offer/fetchFavoriteOffers',
      async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
          const response = await extra.api.get<PlaceCardType[]>(APIRoute.Favorite);

          if (!response.data) {
            throw new Error();
          }

          return response.data;
        } catch (error) {
          return rejectWithValue(manageResponseError(error));
        }
      },
    );

export const fetchFavorite = createAsyncThunk<
OfferCardType,
{
  favoriteStatus: FavoriteStatus;
  offerId: PlaceCardType['id'];
},
ThunkConfig<string>
>(
  'offer/fetchFavorite',
  async ({favoriteStatus, offerId}, thunkApi) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkApi;
    const offers = getOffers(getState());
    const favorites = getFavoriteOffers(getState()) || [];

    try {
      const response = await extra.api.post<OfferCardType>(`${APIRoute.Favorite}/${offerId}/${favoriteStatus}`);

      if (!response.data) {
        throw new Error();
      }

      const newOffers = offers.map((offer) => offer.id === offerId ? {...offer, isFavorite: !!favoriteStatus} : offer);
      const newFavorites = favoriteStatus === FavoriteStatus.IsNotInFavorite ?
        favorites.filter((card) => card.id !== offerId) :
        [...favorites, response.data as PlaceCardType];
      dispatch(updateFavorites(newFavorites));
      dispatch(setSingleOffer(response.data));
      dispatch(setOffers(newOffers));

      return response.data;
    } catch (error) {
      return rejectWithValue(manageResponseError(error));
    }
  },
);
