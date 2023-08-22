import { toast } from 'react-toastify';
import { PlaceCardType } from '../types/place-card';
import { api } from '../api/api';
import { APIRoute } from '../const';
import axios from 'axios';
import { ErrorType } from '../types/error';

export async function fetchFavorite<T>(offerId: PlaceCardType['id'], status: 0 | 1): Promise<T | undefined> {
  try {
    const response = await api.post(`${APIRoute.Favorite}/${offerId}/${status}`);
    if (!response.data) {
      throw new Error();
    }
    return response.data as Promise<T>;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = error?.response?.data as ErrorType | undefined;
      if (data) {
        toast.error(data.message);
      }
    }
  }
}
