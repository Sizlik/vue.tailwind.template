import moment from 'moment'
import { jwtDecode } from 'node_modules/jwt-decode/build/cjs'

export type TokensRaw = {
  access: string | null
  refresh: string | null
}

class JwtData {
  user: number
  unixDate: number

  constructor(user: number, unixDate: number) {
    this.user = user
    this.unixDate = unixDate
  }
  get date() {
    return moment.unix(this.unixDate).utc()
  }
}

export class BaseAuthenticationTokens {
  access: string | null
  refresh: string | null
  constructor(access: string | null, refresh: string | null) {
    this.access = access && this.tokenIsValid(access) ? access : null
    this.refresh = refresh && this.tokenIsValid(refresh) ? refresh : null
    if (this.access) {
      localStorage.setItem('access', this.access)
    }
    if (this.refresh) {
      localStorage.setItem('refresh', this.refresh)
    }
  }

  static getFromStorage(): BaseAuthenticationTokens {
    const access = localStorage.getItem('access')
    const refresh = localStorage.getItem('refresh')
    return new BaseAuthenticationTokens(access, refresh)
  }

  removeTokens(): void {
    this.removeRefresh()
    this.removeAccess()
  }

  removeAccess(): void {
    localStorage.removeItem('access')
    this.access = null
  }

  removeRefresh(): void {
    localStorage.removeItem('refresh')
    this.refresh = null
  }

  get accessIsValid(): boolean {
    return this.tokenIsValid(this.access)
  }

  get refreshIsValid(): boolean {
    return this.tokenIsValid(this.refresh)
  }

  private tokenIsValid(token: string | null): boolean {
    if (!token) return false
    const currentDate = (Date.now() / 1000) | 0
    try {
      const data = this.getJwtData(token)
      return currentDate < data.unixDate
    } catch (e) {
      return false
    }
  }

  getJwtData(token: string): JwtData {
    const result = jwtDecode<{ exp: number; user_id: number }>(token)
    return new JwtData(result.user_id, result.exp)
  }
}
