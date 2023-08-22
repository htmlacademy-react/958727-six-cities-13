import axios from 'axios';
import { toast } from 'react-toastify';
import { ErrorType } from '../../types/error';
import { shouldDisplayError } from '../../helpers/should-display-error';

export function manageResponseError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error?.response?.data as ErrorType | undefined;
    const status = error?.response?.status as number;
    if (data && shouldDisplayError(status)) {
      toast.error(data.message);
      return data.message;
    }
  }
  return 'error';
}
