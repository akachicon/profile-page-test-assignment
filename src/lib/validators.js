const formatResult = (isValid, errorMessage) => ({
  isValid,
  errorMessage,
});

export function name(str) {
  const words = str
    .trim()
    .split(' ')
    .filter((w) => w.length);
  const firstNameRegex = /^[а-яА-ЯЁё]+$/;
  const lastNameRegex = /^[а-яА-ЯЁё-]+$/;

  if (!words.length) {
    return formatResult(false, 'Поле не должно быть пустым');
  }

  const [firstName, lastName] = words;

  if (!firstNameRegex.test(firstName)) {
    return formatResult(false, 'Имя должно содержать только русские буквы');
  }

  if (firstName[0] !== firstName[0].toUpperCase()) {
    return formatResult(false, 'Имя должно начинаться с заглавной буквы');
  }

  if (words.length === 1) {
    return formatResult(false, 'Поле должно содержать имя и фамилию');
  }

  if (!lastNameRegex.test(lastName)) {
    return formatResult(false, 'Фамилия должна содержать только русские буквы');
  }

  if (lastName[0] !== lastName[0].toUpperCase() || lastName[0] === '-') {
    return formatResult(false, 'Фамилия должна начинаться с заглавной буквы');
  }

  if (lastName.slice(-1) === '-') {
    return formatResult(false, 'Некорректная фамилия');
  }

  const compositeLastName = lastName.split('-').filter((w) => w.length);

  if (compositeLastName.length >= 2) {
    if (
      compositeLastName.length === 2 &&
      compositeLastName[1][0] !== compositeLastName[1][0].toUpperCase()
    ) {
      return formatResult(false, 'Фамилия должна начинаться с заглавной буквы');
    }

    if (compositeLastName.length > 2) {
      return formatResult(false, 'Некорректная фамилия');
    }
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
