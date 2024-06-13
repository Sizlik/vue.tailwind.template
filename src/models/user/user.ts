import { BaseModel } from 'src/corexModels/apiModels/baseModel';

export type UserRaw = {
  email?: string;
  first_name?: string;
  id?: number;
  is_staff?: boolean;
  last_name?: string;
  partner?: string | null;
  phone?: string | null;
  is_superuser?: boolean;
};

export class User implements BaseModel {
  email: string | null;
  firstName: string | null;
  id: number | undefined;
  isStaff: boolean;
  lastName: string | null;
  partner: string | null;
  phone: string | null;
  isSuperuser?: boolean;
  constructor(raw: UserRaw) {
    this.id = raw.id || undefined;
    this.email = raw.email || null;
    this.firstName = raw.first_name || null;
    this.isStaff = raw.is_staff || false;
    this.lastName = raw.last_name || null;
    this.partner = raw.partner || null;
    this.phone = raw.phone || null;
  }

  toJson(): Record<string, any> {
    return {
      // id: this.id,
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
    };
  }
}
