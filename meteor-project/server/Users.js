import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

Accounts.onCreateUser((options, user) => {
  // Assign the default role to the new user
  user.roles = ['default-role'];
  // Other user initialization code
  return user;
});

Meteor.methods({
  'users.setRole'(userId, role) {
    check(userId, String);
    check(role, String);

    if (Meteor.isServer) {
      // Make sure only admins can set the role, or users can set their own role upon registration
      if (Roles.userIsInRole(this.userId, 'admin') || this.userId === userId) {
        Roles.addUsersToRoles(userId, role);
      } else {
        throw new Meteor.Error('not-authorized');
      }
    }
  },
  // ... other user-related methods ...
});