import { AuthorizationStatus, NameSpace } from '../../const';
import { getAuthorizationStatus, getUserData } from './selectors';
import { createFakeUser } from '../../utils/mocks/create-fake-user';

describe('User process selectors', () => {
  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: createFakeUser(),
    }
  };

  it('should return authorizationStatus from state', () => {
    const { authorizationStatus } = state[NameSpace.User];
    const result = getAuthorizationStatus(state);
    expect(result).toEqual(authorizationStatus);
  });

  it('should return userData from state', () => {
    const { userData } = state[NameSpace.User];
    const result = getUserData(state);
    expect(result).toEqual(userData);
  });
});
