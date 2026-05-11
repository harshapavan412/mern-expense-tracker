import React from "react";
function ExpenseList({ expenses, fetchExpenses }) {
  const token = localStorage.getItem("token");

  const deleteExpense = async (id) => {
    await fetch(`http://localhost:5000/api/expenses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchExpenses();
  };

  return (
    <div>
      {expenses.map((expense) => (
        <div key={expense._id} className="expense-card">
          <div className="expense-info">
            <h3>{expense.title}</h3>
            <p>${expense.amount}</p>
          </div>

          <button
            className="delete-btn"
            onClick={() => deleteExpense(expense._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
