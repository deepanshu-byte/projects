import React, { memo } from "react";
import { useTracker } from 'meteor/react-meteor-data';
import { LoansCollection } from "../api/LoansCollection";

export const Dashboard = () => {
  const { user, userLoans, isLoading } = useTracker(() => {
    const noDataAvailable = { user: null, userLoans: [] };
    const user = Meteor.user();
    if (!user) {
      return noDataAvailable;
    }
    const loansHandler = Meteor.subscribe('userLoans');
    if (!loansHandler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }
    const userLoans = LoansCollection.find({ userId: user._id }).fetch();
    return { user, userLoans };
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render different components based on the user's role
  const renderDashboard = () => {
    if (Roles.userIsInRole(user._id, 'admin')) {
      return <AdminDashboard loans={userLoans} />;
    } else if (Roles.userIsInRole(user._id, 'lender')) {
      return <LenderDashboard loans={userLoans} />;
    } else if (Roles.userIsInRole(user._id, 'borrower')) {
      return <BorrowerDashboard loans={userLoans} />;
    }
    return <DefaultDashboard />;
  };

  return (
    <div>
      {renderDashboard()}
    </div>
  );
};