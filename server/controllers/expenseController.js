const Expense = require("../models/Expense");

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createExpense = async (req, res) => {
  try {
    const { title, amount } = req.body;

    const expense = await Expense.create({
      title,
      amount,
      user: req.user.id,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);

    res.json({ message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getExpenses,
  createExpense,
  deleteExpense,
};
