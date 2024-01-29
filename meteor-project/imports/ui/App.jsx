import React from 'react';
import { Header } from "./Header";
import { UserRegistration } from "./UserRegistration";
import { RoleSelection } from "./RoleSelection";
import { LoanRequestForm } from "./LoanRequestForm";
import { LoanList } from "./LoanList";
import { PaymentConfirmation } from "./PaymentConfirmation";
import { PaymentList } from "./PaymentList";
import { AdminDashboard } from "./AdminDashboard";
import { useTracker } from 'meteor/react-meteor-data';

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const userRoles = useTracker(() => {
    // Subscription to user roles could be added here
    return user?.roles || [];
  });

  return (
    <div>
      <Header />
      <div className="min-h-full">
        <div className="max-w-4xl mx-auto p-2">
          {!user && <UserRegistration />}
          {user && !userRoles.includes('admin', 'borrower', 'lender') && <RoleSelection />}
          {userRoles.includes('borrower') && (
            <>
              <LoanRequestForm />
              <LoanList />
            </>
          )}
          {userRoles.includes('lender') && (
            <>
              <PaymentConfirmation />
              <PaymentList />
            </>
          )}
          {userRoles.includes('admin') && <AdminDashboard />}
        </div>
      </div>
    </div>
  );
};