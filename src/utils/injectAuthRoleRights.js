export const injectAuthRoleRights = (state, returnValues) => {
  const {
    auth: {
      roleRight
    }
  } = state;
  return ({ ...returnValues, userRights: roleRight });
}