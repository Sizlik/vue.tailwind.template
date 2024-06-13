import moment from 'moment';

export class DateField {
  _initialValue: string | null;
  _customLocalFormat: string | null;

  constructor(v?: string | null, customLocalFormat?: string) {
    this._initialValue = v || null;
    this._customLocalFormat = customLocalFormat || null;
  }

  get momentValue() {
    if (!this._initialFormat) return null;
    if (this._initialWithTime)
      return moment.utc(this._initialValue, this._initialFormat).local();
    else return moment(this._initialValue, this._initialFormat).local();
  }

  get value() {
    if (!this._initialValue) return null;
    return this.momentValue?.locale('ru').local().format(this._format) || null;
  }

  set value(v: string | null | undefined) {
    if (!v) this._initialValue = null;
    else if (this._initialWithTime)
      this._initialValue = moment(v, this._format)
        .utc()
        .format(this._initialFormat);
    else
      this._initialValue = moment(v, this._format).format(this._initialFormat);
  }

  get valueWithDefaultFormat() {
    if (!this._initialValue) return null;
    return (
      this.momentValue?.locale('ru').local().format(this._defaultLocalFormat) ||
      null
    );
  }

  set valueWithDefaultFormat(v: string | null | undefined) {
    if (!v) this._initialValue = null;
    else if (this._initialWithTime)
      this._initialValue = moment(v, this._defaultLocalFormat)
        .utc()
        .format(this._initialFormat);
    else
      this._initialValue = moment(v, this._defaultLocalFormat).format(
        this._initialFormat
      );
  }

  get _initialFormat() {
    const value = this._initialValue?.split(' ') || [];
    if (value.length > 1) {
      return DateField.serverDateTimeFormat;
    } else {
      return DateField.serverDateFormat;
    }
  }

  get _initialWithTime() {
    return this._initialFormat.split(' ').length > 1;
  }

  get _format() {
    if (this._customLocalFormat) return this._customLocalFormat;
    return this._defaultLocalFormat;
  }

  get _defaultLocalFormat() {
    const value = this._initialValue?.split(' ') || [];
    if (value.length > 1) {
      return DateField.localDateTimeFormat;
    } else {
      return DateField.localDateFormat;
    }
  }

  toJson() {
    if (!this._initialValue) return null;

    if (this._initialWithTime) {
      return this.momentValue?.utc().format(this._initialFormat) || null;
    } else return this.momentValue?.format(this._initialFormat) || null;
  }

  static get serverDateTimeFormat() {
    return 'YYYY-MM-DD HH:mm:ss';
  }

  static get serverDateFormat() {
    return 'YYYY-MM-DD';
  }

  static get localDateTimeFormat() {
    return 'DD.MM.YYYY HH:mm:ss';
  }

  static get localDateFormat() {
    return 'DD.MM.YYYY';
  }
}
