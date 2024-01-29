import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { Roles } from 'meteor/alanning:roles';
import {ErrorAlert} from "./components/ErrorAlert";
import {SuccessAlert} from "./components/SuccessAlert";

export const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const showError = (message) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  const showSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => {
      setSuccess("");
    }, 5000);
  };

  const registerUser = () => {
    Accounts.createUser({ email, password }, (err) => {
      if (err) {
        showError(err.reason);
      } else {
        Meteor.call('users.setRole', Meteor.userId(), role, (err) => {
          if (err) {
            showError(err.reason);
          } else {
            showSuccess("User registered and role set.");
            setEmail("");
            setPassword("");
            setRole("");
          }
        });
      }
    });
  };

  return (
    <form className="mt-6">
      {error && <ErrorAlert message={error} />}
      {success && <SuccessAlert message={success} />}
      <div className="grid grid-cols-6 gap-6">
        {/* Email input */}
        <div className="col-span-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Password input */}
        <div className="col-span-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Role selection */}
        <div className="col-span-6">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="borrower">Borrower</option>
            <option value="lender">Lender</option>
          </select>
        </div>
      </div>

      {/* Register button */}
      <div className="px-2 py-3 text-right">
        <button
          type="button"
          onClick={registerUser}
          className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
        >
          Register
        </button>
      </div>
    </form>
  );
};