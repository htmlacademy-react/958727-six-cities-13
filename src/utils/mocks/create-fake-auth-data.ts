import { AuthType } from '../../types/auth';

export const createFakeAuthData = (isEmpty = false): AuthType => isEmpty ?
  ({ login: 'asf@ff.ru',
    password: 'ff12'}as AuthType)
  :
  ({
    login: 'asf@ff.ru',
    password: 'ff12'
  } as AuthType);
