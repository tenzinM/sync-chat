const express = require("express");
const pool = require("../db");
const auth = require("../middleware/auth");

const router = express.Router();

// SAVE MESSAGE
router.post("/", auth, async (req, res) => {
  const { message, room } = req.body;

  const result = await pool.query(
    "INSERT INTO messages (user_id, room, message) VALUES ($1, $2, $3) RETURNING *",
    [req.user.id, room, message]
  );

  res.json(result.rows[0]);
});

// GET ROOM MESSAGES
router.get("/:room", auth, async (req, res) => {
  const messages = await pool.query(
    "SELECT * FROM messages WHERE room = $1 ORDER BY created_at",
    [req.params.room]
  );

  res.json(messages.rows);
});

module.exports = router;