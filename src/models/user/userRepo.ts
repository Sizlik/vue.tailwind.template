import { User } from './user';
import BaseRepo from 'src/corexModels/apiModels/baseRepo'
import { userApi } from './userApi';
import { reactive } from 'vue';

export class UserRepo extends BaseRepo<User> {
  api = userApi
}

export const userRepo = reactive(new UserRepo());
