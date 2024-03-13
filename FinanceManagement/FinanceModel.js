const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  //   currentAmount: { type: Number, required: true },
  // Add more fields as needed
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
