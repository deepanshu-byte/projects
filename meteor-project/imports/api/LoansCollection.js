import { Mongo } from 'meteor/mongo';

export const LoansCollection = new Mongo.Collection('loans');

LoansCollection.schema = new SimpleSchema({
  borrowerId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  amount: {
    type: Number,
    min: 0,
  },
  status: {
    type: String,
    allowedValues: ['requested', 'pending', 'paid'],
    defaultValue: 'requested',
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    },
  },
  // Add other necessary fields and validation rules
});

LoansCollection.attachSchema(LoansCollection.schema);