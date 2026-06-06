const express = require("express");
const router = express.Router();
const User = require("../database/schemes/userscheme");

router.post("/getreminders", async (req, res) => {
  try {
    const { mail } = req.body;

    const user = await User.findOne({ mail });

    if (!user) {
      return res.status(404).json([]);
    }

    res.json(user.reminders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
