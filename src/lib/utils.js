export function denormalizeUserData(localDataUser) {
  let name;
  let email;
  let phoneNumber;

  // Though it is inconsistency between server and client,
  // the better ux is to show empty data after receiving html
  // and correct data when it is available.

  if (__IS_SERVER__) {
    name = '';
    email = '';
    phoneNumber = '';
  } else if (localDataUser) {
    // localStorage is available

    name = localDataUser.name || 'Аноним';
    email = localDataUser.email;
    phoneNumber = localDataUser.phoneNumber || 'Укажите номер телефона';
  } else {
    // localStorage is not available

    name = 'Аноним';
    email = '';
    phoneNumber = 'Номер телефона не указан';
  }

  return {
    name,
    email,
    phoneNumber,
  };
}
