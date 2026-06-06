const express = require("express");
const router = express.Router();
const User = require("../database/schemes/userscheme");

router.post("/addrem", async (req, res) => {
  try {
    const data = req.body;

    await User.updateOne(
      { mail: data.mail },
      {
        $push: {
          reminders: {
            title: data.title,
            des: data.des,
            date: data.date,
            time: data.time,
            options: data.option,
          },
        },
      },
    );

    res.status(200).json({
      success: true,
      message: "Reminder added",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;
