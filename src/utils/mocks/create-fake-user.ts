import { datatype, internet, name, system } from 'faker';
import { UserDataType } from '../../types/user-data';

export const createFakeUser = (isToken = false): UserDataType => {
  const fakeUser = {
    name: `${name.firstName()} ${name.lastName()}`,
    avatarUrl: system.filePath(),
    isPro: datatype.boolean(),
    email: internet.email(),
    token: datatype.uuid(),
  } as UserDataType;

  if (isToken) {
    fakeUser.token = datatype.uuid();
  }

  return fakeUser;
};
