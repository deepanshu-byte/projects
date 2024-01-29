import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
  'users.setRole'(role) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Roles.addUsersToRoles(this.userId, role);
  }
});
export const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = (e) => {
    e.preventDefault();
    Accounts.createUser({ email, password }, (error) => {
      if (error) {
        console.log(error);
      } else {
        // Redirect to role selection or dashboard
      }
    });
  };

  return (
    <form onSubmit={registerUser}>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
};