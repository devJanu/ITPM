const Transaction = require("../FinanceManagement/FinanceModel");

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const { amount, description, customerId } = req.body;
    const transaction = new Transaction({ amount, description, customerId });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, description } = req.body;
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { amount, description },
      { new: true }
    );
    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.json(updatedTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All transaction

exports.getTransactionsByCustomerId = async (req, res) => {
  try {
    const { customerId } = req.params;
    const transactions = await Transaction.find({ customerId });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cuerrent Amount Should be pay

exports.deductAmount = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { amount } = req.body;

    // Find the previous amount for the specific customer
    const transaction = await Transaction.findOne({ customerId }).sort({
      createdAt: -1,
    });

    if (!transaction) {
      return res
        .status(404)
        .json({ message: "No transaction found for the customer" });
    }

    // Deduct the latest amount from the previous amount
    const previousAmount = transaction.amount;
    const updatedAmount = previousAmount - amount;

    // Update the database with the new amount for the specific customer
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transaction._id,
      { amount: updatedAmount },
      { new: true }
    );

    if (!updatedTransaction) {
      return res
        .status(404)
        .json({ message: "Failed to update transaction amount" });
    }

    // Return the latest amount to be paid by the specific customer
    res.json({ latestAmount: updatedAmount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.getAllTransactions = async (req, res) => {
//   try {
//     const transactions = await Transaction.find();
//     res.json(transactions);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.createTransaction = async (req, res) => {
//   try {
//     const { amount, description } = req.body;
//     const transaction = new Transaction({ amount, description });
//     await transaction.save();
//     res.status(201).json(transaction);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
