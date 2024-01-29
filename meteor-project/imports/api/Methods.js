import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { LoansCollection } from './LoansCollection';

Meteor.methods({
  // ... existing methods ...

  'users.setRole'(userId, role) {
    check(userId, String);
    check(role, String);

    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized', 'Only admins can assign roles');
    }

    Roles.addUsersToRoles(userId, role);
  },
});

// You may also need to add a method for admins to view all transactions
Meteor.methods({
  // ... existing methods ...

  'loans.getAllTransactions'() {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized', 'Only admins can view all transactions');
    }

    return LoansCollection.find({}).fetch();
  },
});
