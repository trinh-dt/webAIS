import { defineAbility } from '@casl/ability';

export default (user) => defineAbility((can) => {
  let userRoles = user?.roles || [];
  let isAdmin = userRoles.includes('ADMIN');
  if (isAdmin){
    can('manage', 'User');
  }
});