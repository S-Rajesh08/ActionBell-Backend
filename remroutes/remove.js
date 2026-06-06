const express = require("express");
const router = express.Router();
const User = require("../database/schemes/userscheme");

router.post("/deletereminder", async (req, res) => {
  try {
    const { mail, id } = req.body;

    await User.updateOne(
      { mail },
      {
        $pull: {
          reminders: {
            _id: id,
          },
        },
      },
    );

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
module.exports = router;
