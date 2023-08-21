import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {NameSpace, AuthorizationStatus} from '../../const';
import {fetchAuth, fetchLogin, fetchLogout} from '../api-actions';
import { UserProcessType } from '../../types/state';
import { UserDataType } from '../../types/user-data';

const initialUserData: UserDataType = {
  email: '',
  isPro: false,
  name: '',
  avatarUrl: '',
};

const initialState: UserProcessType = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: initialUserData
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.fulfilled, (state, action: PayloadAction<UserDataType>) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<UserDataType>) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
