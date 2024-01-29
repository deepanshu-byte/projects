import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { AccountsUIWrapper } from '/imports/ui/AccountsUIWrapper'; // You'll create this component
import { App } from '/imports/ui/App';

import '../imports/api/ContactsMethods';
import '../imports/api/users';
import '../imports/api/loans';

Meteor.startup(() => {
  render(
    <React.StrictMode>
      <AccountsUIWrapper /> {/* This will render the login forms */}
      <App />
    </React.StrictMode>,
    document.getElementById('react-target')
  );
});