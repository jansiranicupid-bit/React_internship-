import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();

app.use(cors());
app.use(express.json());

const USERS_FILE = "./server/users.json";
const EXPENSE_FILE = "./server/expenses.json";
const ADMIN_FILE = "./server/admin.json";

/* ---------- Helper Functions ---------- */

function readUsers() {
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
}

function saveUsers(users) {
  fs.writeFileSync(
    USERS_FILE,
    JSON.stringify(users, null, 2)
  );
}

function readExpenses() {
  return JSON.parse(
    fs.readFileSync(EXPENSE_FILE, "utf8")
  );
}

function saveExpenses(expenses) {
  fs.writeFileSync(
    EXPENSE_FILE,
    JSON.stringify(expenses, null, 2)
  );
}

/* ---------- Home ---------- */

app.get("/", (req, res) => {
  res.json({
    status: "Server Running"
  });
});

/* ---------- Register ---------- */

app.post("/register", (req, res) => {
  try {

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields required"
      });
    }

    const users = readUsers();

    const existing = users.find(
      user => user.username === username
    );

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Username already exists"
      });
    }

    const newUser = {
      id: Date.now(),
      username,
      password,
      createdAt: new Date()
    };

    users.push(newUser);

    saveUsers(users);

    res.json({
      success: true,
      message: "Registration Successful"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});

/* ---------- Login ---------- */

app.post("/login", (req, res) => {

  const { username, password } = req.body;

  const users = readUsers();

  const user = users.find(
    u =>
      u.username === username &&
      u.password === password
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid Credentials"
    });
  }

  res.json({
    success: true,
    user
  });
});

/* ---------- Admin Login ---------- */

app.post("/admin/login", (req, res) => {

  const admin = JSON.parse(
    fs.readFileSync(ADMIN_FILE)
  );

  const { username, password } = req.body;

  if (
    username === admin.username &&
    password === admin.password
  ) {
    return res.json({
      success: true
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid Admin Credentials"
  });
});

/* ---------- Get Users ---------- */

app.get("/users", (req, res) => {

  const users = readUsers();

  res.json(users);
});

/* ---------- Delete User ---------- */

app.delete("/users/:id", (req, res) => {

  const id = Number(req.params.id);

  let users = readUsers();

  users = users.filter(
    user => user.id !== id
  );

  saveUsers(users);

  let expenses = readExpenses();

  expenses = expenses.filter(
    item => item.userId !== id
  );

  saveExpenses(expenses);

  res.json({
    success: true,
    message: "User Deleted"
  });
});

/* ---------- Add Expense ---------- */

app.post("/expense", (req, res) => {

  const {
    userId,
    amount,
    category,
    type,
    note
  } = req.body;

  const expenses = readExpenses();

  const transaction = {
    id: Date.now(),
    userId,
    amount: Number(amount),
    category,
    type,
    note,
    date: new Date()
  };

  expenses.push(transaction);

  saveExpenses(expenses);

  res.json({
    success: true,
    transaction
  });
});

/* ---------- Get Expenses ---------- */

app.get("/expense/:userId", (req, res) => {

  const userId = Number(req.params.userId);

  const expenses = readExpenses();

  const userExpenses =
    expenses.filter(
      e => e.userId === userId
    );

  res.json(userExpenses);
});

/* ---------- Update Expense ---------- */

app.put("/expense/:id", (req, res) => {

  const id = Number(req.params.id);

  const expenses = readExpenses();

  const index = expenses.findIndex(
    e => e.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      success: false
    });
  }

  expenses[index] = {
    ...expenses[index],
    ...req.body
  };

  saveExpenses(expenses);

  res.json({
    success: true
  });
});

/* ---------- Delete Expense ---------- */

app.delete("/expense/:id", (req, res) => {

  const id = Number(req.params.id);

  let expenses = readExpenses();

  expenses = expenses.filter(
    e => e.id !== id
  );

  saveExpenses(expenses);

  res.json({
    success: true
  });
});

/* ---------- Analytics ---------- */

app.get("/analytics/:userId", (req, res) => {

  const userId = Number(req.params.userId);

  const expenses = readExpenses()
    .filter(e => e.userId === userId);

  const income = expenses
    .filter(e => e.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = expenses
    .filter(e => e.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  const categories = {};

  expenses.forEach(item => {

    if (item.type === "expense") {

      categories[item.category] =
        (categories[item.category] || 0)
        + item.amount;
    }
  });

  res.json({
    income,
    expense,
    balance,
    categories
  });
});

/* ---------- AI Suggestion ---------- */

app.get(
  "/ai-suggestion/:userId",
  (req, res) => {

    const userId =
      Number(req.params.userId);

    const expenses =
      readExpenses().filter(
        e => e.userId === userId
      );

    const income = expenses
      .filter(
        e => e.type === "income"
      )
      .reduce(
        (a, b) => a + b.amount,
        0
      );

    const expense = expenses
      .filter(
        e => e.type === "expense"
      )
      .reduce(
        (a, b) => a + b.amount,
        0
      );

    let suggestion =
      "Excellent financial management.";

    if (expense > income * 0.9) {
      suggestion =
        "High spending detected. Reduce unnecessary expenses.";
    }
    else if (expense > income * 0.7) {
      suggestion =
        "Your expenses are moderate. Consider increasing savings.";
    }

    res.json({
      suggestion
    });
  }
);

/* ---------- Start Server ---------- */

const PORT = 5000;

app.listen(PORT, "0.0.0.0", () => {

  console.log(
    `Server Running On Port ${PORT}`
  );

});
