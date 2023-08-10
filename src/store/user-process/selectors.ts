import { AuthorizationStatus, NameSpace } from '../../const';
import {State} from '../../types/state';
import { UserDataType } from '../../types/user-data';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUserData = (state: State): UserDataType => state[NameSpace.User].userData;
