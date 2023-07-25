export const injectParams =
  injectedObject =>
    arrayOfObjectOrFunc =>
      arrayOfObjectOrFunc.map(
        (item) =>
          typeof (item) === 'function' ? item(injectedObject) : item
      );