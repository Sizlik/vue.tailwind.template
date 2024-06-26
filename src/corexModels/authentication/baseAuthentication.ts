import { api } from 'src/boot/axios';
import { AxiosResponse } from 'axios';

import {
  BaseAuthenticationTokens,
  TokensRaw,
} from './baseAuthenticationTokens.ts';
import moment from 'moment';
import { UserRaw } from 'src/models/user/user';

export class BaseAuthentication {
  user: UserRaw | null = null;
  tokens: BaseAuthenticationTokens;

  tokensClass = BaseAuthenticationTokens;
  // userClass = Customer

  settings = {
    urls: {
      login: 'token/',
      me: '/users/me/',
      register: '/users/',
      refresh: '/token/refresh/',
      changePassword: '/users/change_password/',
      setLanguage: 'users/set_language/',
    },
    apiHeader: {
      key: 'Authorization',
      type: 'Bearer',
    },
    companyGroupHeader: {
      key: 'Company-Group',
    },
  };

  constructor() {
    this.tokens = this.tokensClass.getFromStorage();
    this.setApiHeader();
  }

  async me() {
    if (!this.tokens.accessIsValid) throw Error('Access token is not valid.');
    await this._loadUser();
    // return this.user
  }

  async refresh(): Promise<void> {
    const result: AxiosResponse<TokensRaw> = await api.post(
      this.settings.urls.refresh,
      { refresh: this.tokens.refresh }
    );
    this.tokens = new this.tokensClass(result.data.access, result.data.refresh);
    this.setApiHeader();
  }

  private async _loadUser(): Promise<UserRaw> {
    try {
      const response: AxiosResponse<UserRaw> = await api.get(
        this.settings.urls.me
      );
      this.user = response.data;
      return response.data;
    } catch (e) {
      throw Error('Fail with load user.');
    }
  }

  async login(data: any) {
    this.logout();
    try {
      const response: AxiosResponse<TokensRaw> = await api.post(
        this.settings.urls.login,
        data
      );
      this.tokens = new this.tokensClass(
        response.data.access,
        response.data.refresh
      );
      this.setApiHeader();
      // this.user = await this._loadUser()
      return {
        // user: this.user,
        tokens: this.tokens,
      };
    } catch (e) {
      throw Error('Fail login');
    }
  }

  async register(data: any) {
    this.logout();
    try {
      await api.post(this.settings.urls.register, data);
      return await this.login(data);
    } catch (e) {
      throw Error('Register fail');
    }
  }

  async changePassword(data: any) {
    try {
      return await api.post(this.settings.urls.changePassword, data);
    } catch (e) {
      throw Error('Change password fail');
    }
  }

  async setLanguage(language: string) {
    try {
      return await api.put(this.settings.urls.setLanguage, {
        language: language,
      });
    } catch (e) {
      throw Error('Language change fail');
    }
  }

  logout(): void {
    // this.user = null
    this.tokens.removeTokens();
    Object.assign(api.defaults.headers, { Authorization: null });
  }

  setApiHeader(): void {
    const apiHeader = this.settings.apiHeader;
    if (!this.tokens.access) return;
    Object.assign(api.defaults.headers, {
      [apiHeader.key]: apiHeader.type
        ? `${apiHeader.type} ${this.tokens.access}`
        : this.tokens.access,
    });
  }

  setCompanyGroupHeader(v: string | null | undefined): void {
    Object.assign(api.defaults.headers, {
      [this.settings.companyGroupHeader.key]: v,
    });
  }

  async validateTokens(): Promise<void> {
    let shouldRefresh = false;
    if (this.tokens.access) {
      const date = this.tokens.getJwtData(this.tokens.access).date;
      if (moment.utc().add('1', 'day') >= date) {
        shouldRefresh = true;
      }
    } else shouldRefresh = true;
    if (shouldRefresh && this.tokens.refreshIsValid) {
      await this.refresh();
    }
  }
}
