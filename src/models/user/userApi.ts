import { UserRaw, User } from './user';
import { BaseModelApi } from 'src/corexModels/apiModels/baseModelApi';

export class UserApi extends BaseModelApi<User> {
  routeName = 'users'
  fromJson = (json: UserRaw) => new User(json)
}

export const userApi = new UserApi();
