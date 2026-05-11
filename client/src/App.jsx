import React from "react";
import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [showLogin, setShowLogin] = useState(true);

  const token = localStorage.getItem("token");

  const fetchExpenses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setExpenses(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchExpenses();
    }
  }, []);

  if (!token) {
    return (
      <div>
        {showLogin ? (
          <Login setShowLogin={setShowLogin} />
        ) : (
          <Register setShowLogin={setShowLogin} />
        )}
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      <button className="logout-btn"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
      >
        Logout
      </button>

      <ExpenseForm fetchExpenses={fetchExpenses} />

      <ExpenseList
        expenses={expenses}
        fetchExpenses={fetchExpenses}
      />
    </div>
  );
}

export default App;
