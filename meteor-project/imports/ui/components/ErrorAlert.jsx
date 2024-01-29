import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { ErrorAlert } from './ErrorAlert';

Meteor.methods({
  'users.setRole'(role) {
    check(role, String);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    // Assuming you have a roles package or similar functionality
    Roles.addUsersToRoles(this.userId, role);
  }
});
export const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const registerUser = (e) => {
    e.preventDefault();
    Accounts.createUser({ email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        // Redirect to role selection or dashboard
      }
    });
  };

  return (
    <form onSubmit={registerUser}>
      {error && <ErrorAlert message={error} />}
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
};