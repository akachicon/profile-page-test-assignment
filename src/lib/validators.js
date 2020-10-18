const formatResult = (isValid, errorMessage) => ({
  isValid,
  errorMessage,
});

const getNamePartFormatter = (returnFirstMessage) => (
  isValid,
  firstNameMessage,
  lastNameMessage
) =>
  formatResult(
    isValid,
    returnFirstMessage ? firstNameMessage : lastNameMessage
  );

function namePart(namePartStr, formatResult) {
  const namePartRegex = /^[а-яА-ЯЁё-]+$/;

  if (!namePartRegex.test(namePartStr)) {
    return formatResult(
      false,
      'Имя содержит недопустимые символы',
      'Фамилия содержит недопустимые символы'
    );
  }

  if (
    namePartStr[0] !== namePartStr[0].toUpperCase() ||
    namePartStr[0] === '-'
  ) {
    return formatResult(
      false,
      'Имя должно начинаться с заглавной буквы',
      'Фамилия должна начинаться с заглавной буквы'
    );
  }

  if (namePartStr.slice(-1) === '-') {
    return formatResult(false, 'Некорректное имя', 'Некорректная фамилия');
  }

  const compositeName = namePartStr.split('-').filter((w) => w.length);

  if (compositeName.length === 1) {
    if (compositeName[0].slice(1) !== compositeName[0].slice(1).toLowerCase()) {
      return formatResult(
        false,
        'Имя содержит недопустимые заглавные буквы',
        'Фамилия содержит недопустимые заглавные буквы'
      );
    }
  }

  if (compositeName.length === 2) {
    if (compositeName[1][0] !== compositeName[1][0].toUpperCase()) {
      return formatResult(
        false,
        'Имя должно начинаться с заглавной буквы',
        'Фамилия должна начинаться с заглавной буквы'
      );
    }

    if (
      compositeName[0].slice(1) !== compositeName[0].slice(1).toLowerCase() ||
      compositeName[1].slice(1) !== compositeName[1].slice(1).toLowerCase()
    ) {
      return formatResult(
        false,
        'Имя содержит недопустимые заглавные буквы',
        'Фамилия содержит недопустимые заглавные буквы'
      );
    }
  }

  if (compositeName.length > 2) {
    return formatResult(false, 'Некорректное имя', 'Некорректная фамилия');
  }

  return formatResult(true, '');
}

export function name(str) {
  const words = str
    .trim()
    .split(' ')
    .filter((w) => w.length);

  if (!words.length) {
    return formatResult(false, 'Поле не должно быть пустым');
  }

  const [firstName, lastName] = words;
  const firstNameResult = namePart(firstName, getNamePartFormatter(true));

  if (!firstNameResult.isValid) {
    return firstNameResult;
  }

  if (words.length === 1) {
    return formatResult(false, 'Поле должно содержать имя и фамилию');
  }

  const lastNameResult = namePart(lastName, getNamePartFormatter(false));

  if (!lastNameResult.isValid) {
    return lastNameResult;
  }

  if (words.length > 2) {
    return formatResult(false, 'Поле должно содержать только имя и фамилию');
  }

  return formatResult(true, '');
}

export function email(str) {
  const trimmedStr = str.trim();

  if (!trimmedStr.length) {
    return formatResult(false, 'Поле не может быть пустым');
  }

  const isValid = /^[a-zA-Z0-9+._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/.test(
    trimmedStr
  );

  if (!isValid) {
    return formatResult(false, 'Некорректный e-mail');
  }

  return formatResult(true, '');
}

export function phone(str) {
  const trimmedStr = str.trim();
  const normalizedString = trimmedStr.replace(/[+\s()_-]/g, '');
  const numberLength = normalizedString.length;

  if (!numberLength || numberLength === 1) {
    return formatResult(false, 'Необходимо указать номер');
  }

  if (normalizedString.length !== 11) {
    return formatResult(false, 'Некорректный номер');
  }

  return formatResult(true, '');
}
