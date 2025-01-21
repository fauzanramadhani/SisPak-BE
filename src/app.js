const express = require("express");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const method = require("./routes/method");
const product = require("./routes/product");
const forwardChaining = require("./routes/system/forwardChaining");
const system = require("./routes/system/system")
const prepopulate = require('../src/prisma/prepopulate');

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
app.use("/method", method);
app.use("/product", product);
app.use("/system/forward_chaining", forwardChaining);
app.use("/system", system);

prepopulate()
  .then(() => {
    console.log('Database successfully synchronized');
  })
  .catch((error) => {
    console.error('Terjadi kesalahan:', error);
  });

module.exports = app;