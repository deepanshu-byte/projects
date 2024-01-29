import assert from "assert";
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Loans } from '/imports/api/loans';

describe("meteor-wallet", function () {
  it("package.json has correct name", async function () {
    const { name } = await import("../package.json");
    assert.strictEqual(name, "meteor-wallet");
  });

  describe("User Registration", function () {
    it("allows users to register with an email", function () {
      const email = "test@example.com";
      const password = "password123";
      Accounts.createUser({ email, password });
      const user = Accounts.findUserByEmail(email);
      assert.ok(user);
    });
  });

  describe("Role Assignment", function () {
    it("allows users to choose roles", function () {
      const user = Accounts.findUserByEmail("test@example.com");
      Roles.addUsersToRoles(user._id, 'borrower');
      assert.ok(Roles.userIsInRole(user._id, 'borrower'));
    });
  });

  describe("Loan Requests", function () {
    it("allows a borrower to request a loan", function () {
      const user = Accounts.findUserByEmail("test@example.com");
      Meteor.runAsUser(user._id, function () {
        const loanId = Meteor.call('loans.request', 1000);
        const loan = Loans.findOne(loanId);
        assert.strictEqual(loan.amount, 1000);
      });
    });

    it("allows a borrower to see past loans", function () {
      const user = Accounts.findUserByEmail("test@example.com");
      const loans = Meteor.call('loans.getPastLoans', user._id);
      assert.ok(loans.length > 0);
    });
  });

  describe("Loan Payments", function () {
    it("allows a lender to confirm payment of a loan", function () {
      const lender = Accounts.findUserByEmail("lender@example.com");
      const loan = Loans.findOne(); // Assuming there's at least one loan
      Meteor.runAsUser(lender._id, function () {
        Meteor.call('loans.confirmPayment', loan._id);
        const updatedLoan = Loans.findOne(loan._id);
        assert.strictEqual(updatedLoan.status, 'confirmed');
      });
    });

    it("allows a lender to see past payments", function () {
      const lender = Accounts.findUserByEmail("lender@example.com");
      const payments = Meteor.call('loans.getPastPayments', lender._id);
      assert.ok(payments.length > 0);
    });
  });

  describe("Admin Dashboard", function () {
    it("allows admin users to see all transactions", function () {
      const admin = Accounts.findUserByEmail("admin@example.com");
      Meteor.runAsUser(admin._id, function () {
        const transactions = Meteor.call('allTransactions');
        assert.ok(transactions.length > 0);
      });
    });
  });
});