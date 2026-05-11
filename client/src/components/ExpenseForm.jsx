import React from "react";
import { useState } from "react";

function ExpenseForm({ fetchExpenses }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        amount,
      }),
    });

    setTitle("");
    setAmount("");

    fetchExpenses();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;
