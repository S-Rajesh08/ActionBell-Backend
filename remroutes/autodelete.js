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

    const now = new Date();

    const validReminders = user.reminders.filter((item) => {
      const reminderDate = new Date(item.date);
      const reminderTime = new Date(item.time);

      const finalDateTime = new Date(
        reminderDate.getFullYear(),
        reminderDate.getMonth(),
        reminderDate.getDate(),
        reminderTime.getHours(),
        reminderTime.getMinutes(),
      );

      return finalDateTime > now;
    });

    user.reminders = validReminders;

    await user.save();

    res.json(validReminders);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
module.exports = router;
