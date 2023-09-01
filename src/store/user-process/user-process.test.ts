import {expect} from 'vitest';
import { fetchAuth, fetchLogin, fetchLogout } from '../api-actions';
import { userProcess } from './user-process';
import { AuthorizationStatus } from '../../const';
import { createFakeUser } from '../../utils/mocks/create-fake-user';
import { createFakeAuthData } from '../../utils/mocks/create-fake-auth-data';

vi.mock('../root-reducer', () => ({ rootReducer: vi.fn() }));

describe('userProcess', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: {
        email: '',
        isPro: false,
        name: '',
        avatarUrl: '',
      }
    };

    const result = userProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });
});

describe('fetchAuth', () => {
  it('should set userData', () => {
    const mockUser = createFakeUser();
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: mockUser
    };

    const result = userProcess.reducer(undefined, fetchAuth.fulfilled(mockUser, '', undefined));

    expect(result).toEqual(expectedState);
  });
  it('should set authorizationStatus to AuthorizationStatus.NoAuth', () => {
    const error = new Error;
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: {
        email: '',
        isPro: false,
        name: '',
        avatarUrl: '',
      }
    };

    const result = userProcess.reducer(undefined, fetchAuth.rejected(error, '', undefined));

    expect(result).toEqual(expectedState);
  });
});

describe('fetchLogin', () => {
  it('should set userData', () => {
    const mockUser = createFakeUser();
    const mockUserData = createFakeAuthData();
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: mockUser
    };

    const result = userProcess.reducer(undefined, fetchLogin.fulfilled(mockUser, '', mockUserData));

    expect(result).toEqual(expectedState);
  });
  it('should set authorizationStatus to AuthorizationStatus.NoAuth', () => {
    const error = new Error;
    const mockUserData = createFakeAuthData(true);
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: {
        email: '',
        isPro: false,
        name: '',
        avatarUrl: '',
      }
    };

    const result = userProcess.reducer(undefined, fetchLogin.rejected(error, '', mockUserData));

    expect(result).toEqual(expectedState);
  });
});

describe('fetchLogout', () => {
  it('should set authorizationStatus to AuthorizationStatus.NoAuth', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: {
        email: '',
        isPro: false,
        name: '',
        avatarUrl: '',
      }
    };

    const result = userProcess.reducer(undefined, fetchLogout.fulfilled(undefined, '', undefined));

    expect(result).toEqual(expectedState);
  });
});
