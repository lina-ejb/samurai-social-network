
export const usersToggleFollow = (items, actionId, prototype,  param) =>
  items.map((user) => {
    if (user[prototype] === actionId) {
      return { ...user, ...param };
    }
    return user;
  });

