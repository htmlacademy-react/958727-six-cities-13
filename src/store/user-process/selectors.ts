import { AuthorizationStatus, NameSpace } from '../../const';
import {State} from '../../types/state';
import { UserDataType } from '../../types/user-data';

export const getAuthorizationStatus = (state: Pick<State, typeof NameSpace.User>): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUserData = (state: Pick<State, typeof NameSpace.User>): UserDataType => state[NameSpace.User].userData;
