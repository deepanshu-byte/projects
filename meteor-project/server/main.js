import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import '/imports/api/Users';
import '/imports/api/Loans';
import '/imports/api/LoansMethods';
import '/imports/api/LoansPublications';

Meteor.startup(() => {
  // Code to run on server at startup
  // Setup initial roles if they don't exist
  if (!Meteor.roles.findOne({ name: 'admin' })) {
    Roles.createRole('admin');
  }
  if (!Meteor.roles.findOne({ name: 'borrower' })) {
    Roles.createRole('borrower');
  }
  if (!Meteor.roles.findOne({ name: 'lender' })) {
    Roles.createRole('lender');
  }
});