const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    balance: { type: Number, required: true },
    transactionRecords: {
      withdraw: [
        {
          date: { type: Date, default: new Date() },
          amount: { type: Number },
        },
      ],
      deposite: [
        {
          date: { type: Date, default: new Date() },
          amount: { type: Number },
        },
      ],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cart", cartSchema);
/*
Transactions Page: Login should take the customer to the transactions 
page to see all of its transaction records along with Deposit and 
Withdraw buttons. Clicking on either of the buttons should open up a 
popup showing available balance along with a numeric input field to 
enter the amount for deposit/withdrawal. Withdrawal will deduct & 
deposit will add to the balance amount. If the withdrawal amount 
entered is greater than the balance amount then show a message, 
"Insufficient Funds".  
*/
