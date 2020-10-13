const USER = 'user';

export function getUser() {
  try {
    const user = JSON.parse(localStorage.getItem(USER));

    if (user) {
      return user;
    }

    return {
      firstName: '',
      lastName: '',
      phoneNumber: '',
    };
  } catch (e) {
    return undefined;
  }
}

export function setUser(data) {
  try {
    const userString = localStorage.getItem(USER);
    const user = JSON.parse(userString);
    const newItem = JSON.stringify({ ...user, ...data });

    localStorage.setItem(USER, newItem);
  } catch (e) {
    // ignore
  }
}
