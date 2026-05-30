const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    message: "Server running"
  });
});

const authRoutes = require("./routes/auth");

app.use("/api/auth", authRoutes);

const messageRoutes = require("./routes/messages");

app.use("/api/messages", messageRoutes);

module.exports = app;

