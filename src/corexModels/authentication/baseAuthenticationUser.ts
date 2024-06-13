import { BaseModel } from '../apiModels/baseModel.ts'

export type BaseAuthenticationUserRaw = {
  id: number | undefined
  email?: string
  phone?: string
  username?: string
  first_name?: string
  last_name?: string
  is_staff?: boolean
}

export class BaseAuthenticationUser implements BaseModel {
  id: number | undefined
  email?: string
  phone?: string
  username?: string
  first_name?: string
  last_name?: string
  is_staff?: boolean
  constructor(raw: BaseAuthenticationUserRaw) {
    this.id = raw.id
    this.email = raw.email
    this.phone = raw.phone
    this.username = raw.username
    this.first_name = raw.first_name
    this.last_name = raw.last_name
    this.is_staff = raw.is_staff
  }
  toJson(): Record<string, any> {
    return {
      id: this.id,
      email: this.email,
      username: this.phone,
      first_name: this.username,
      last_name: this.first_name,
      phone: this.last_name,
    }
  }
}
