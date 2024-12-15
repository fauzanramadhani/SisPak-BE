const express = require("express");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// Routes
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

module.exports = app;