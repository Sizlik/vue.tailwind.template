export default {
  email: (value: string) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || 'Некорректный e-mail';
  },
  required: (value: any) => !!value || 'Поле обязательно для заполнения',
  match: (p: any) => (v: any) => (v || '') === p || 'Пароли должны совпадать',
  length: (p: number) => (v: string) =>
    v.length >= p || `Минимальная длина ${p}`,
  password: (value: string) => {
    const pattern =
      /^(?=.*[a-zA-Zа-яА-ЯёЁ])(?=.*\d)[a-zA-Zа-яА-ЯёЁ\d!"#$%&'()*+,-.\/:;<=>?@\[\\\]^_`{|}~]{2,}$/;
    return pattern.test(value) || 'Пароль должен содержать буквы и цифры';
  },
  positiveNumber: (value: number) => (
    value >= 0 || 'Значение не может быть меьше нуля'
  )

};
