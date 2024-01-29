import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { SuccessAlert } from './SuccessAlert';

export const RoleSelectionForm = () => {
  const [role, setRole] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRoleSelection = () => {
    Meteor.call('users.setRole', role, (error) => {
      if (error) {
        console.error('Error setting role:', error);
      } else {
        setSuccessMessage(`Role ${role} set successfully!`);
      }
    });
  };

  return (
    <div>
      {successMessage && <SuccessAlert message={successMessage} />}
      {/* Role selection form elements here */}
      <button onClick={handleRoleSelection}>Set Role</button>
    </div>
  );
};