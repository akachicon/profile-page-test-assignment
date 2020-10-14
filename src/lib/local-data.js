const USER = 'user';

// getUser() will always return necessary fields if localStorage
// is available, null otherwise.

export function getUser() {
  try {
    const user = JSON.parse(localStorage.getItem(USER));

    if (user) {
      return user;
    }

    return {
      name: '',
      email: '',
      phoneNumber: '',
    };
  } catch (e) {
    return null;
  }
}

export function setUser(data) {
  try {
    const user = getUser();
    const newItem = { ...user, ...data };
    localStorage.setItem(USER, JSON.stringify(newItem));

    return newItem;
  } catch (e) {
    // ignore
  }
}
