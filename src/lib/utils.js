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
    email = localDataUser.email || 'E-mail не указан';
    phoneNumber = localDataUser.phoneNumber || 'Номер телефона не указан';
  } else {
    // localStorage is not available

    name = 'Аноним';
    email = 'E-mail не указан';
    phoneNumber = 'Номер телефона не указан';
  }

  return {
    name,
    email,
    phoneNumber,
  };
}

export function shortenUserName(name) {
  const [firstName, lastName] = name.split(' ');

  if (!lastName) return name;

  const compositeLastName = lastName.split('-');

  const shortLastName =
    compositeLastName.length === 2
      ? `${compositeLastName[0].slice(0, 1)}.-${compositeLastName[1].slice(
          0,
          1
        )}.`
      : `${lastName.slice(0, 1)}.`;

  return `${firstName} ${shortLastName}`;
}
