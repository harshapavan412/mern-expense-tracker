const express = require("express");
const {
  getExpenses,
  createExpense,
  deleteExpense,
} = require("../controllers/expenseController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getExpenses);
router.post("/", protect, createExpense);
router.delete("/:id", protect, deleteExpense);

module.exports = router;
