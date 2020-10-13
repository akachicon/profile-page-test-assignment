export function denormalizeUserData(localDataUser) {
  let firstName;
  let lastName;
  let phoneNumber;

  // Though it is inconsistency between server and client,
  // the better ux is to show empty data after receiving html
  // and correct data when it is available.

  if (__IS_SERVER__) {
    firstName = '';
    lastName = '';
    phoneNumber = '';
  } else if (localDataUser) {
    // localStorage is available

    firstName = localDataUser.firstName || 'Аноним';
    lastName = localDataUser.lastName;
    phoneNumber = localDataUser.phoneNumber || 'Укажите номер телефона';
  } else {
    // localStorage is not available

    firstName = 'Аноним';
    lastName = '';
    phoneNumber = 'Номер телефона не указан';
  }

  return {
    firstName,
    lastName,
    phoneNumber,
  };
}
