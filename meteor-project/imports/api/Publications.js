import { Meteor } from 'meteor/meteor';
import { LoansCollection } from './LoansCollection';
import { Roles } from 'meteor/alanning:roles';

Meteor.publish('userLoans', function () {
  if (!this.userId) {
    return this.ready();
  }

  if (Roles.userIsInRole(this.userId, ['borrower'])) {
    return LoansCollection.find({ borrowerId: this.userId });
  } else if (Roles.userIsInRole(this.userId, ['admin'])) {
    // Admins can see all loans
    return LoansCollection.find({});
  } else {
    // If not a borrower or admin, no loans data is published
    return this.ready();
  }
});

Meteor.publish('userPayments', function () {
  if (!this.userId) {
    return this.ready();
  }

  if (Roles.userIsInRole(this.userId, ['lender'])) {
    return LoansCollection.find({ lenderId: this.userId });
  } else if (Roles.userIsInRole(this.userId, ['admin'])) {
    // Admins can see all payments
    return LoansCollection.find({});
  } else {
    // If not a lender or admin, no payments data is published
    return this.ready();
  }
});

Meteor.publish('allTransactions', function () {
  if (!this.userId || !Roles.userIsInRole(this.userId, ['admin'])) {
    // Only admin users should have access to all transactions
    return this.ready();
  }

  // Publish all transactions for admin users
  return LoansCollection.find({});
});