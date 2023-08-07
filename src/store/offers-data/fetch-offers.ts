import { createAsyncThunk } from '@reduxjs/toolkit';
import { PlaceCardType } from '../../types/place-card';
import { ThunkConfig } from '../../types/state';
import { APIRoute } from '../../const';

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
