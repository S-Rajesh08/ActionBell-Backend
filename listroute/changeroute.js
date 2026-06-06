const express = require("express");
const router = express.Router();
const db = require("../database/schemes/userscheme");

router.post("/changelist", async (req, res) => {
  try {
    const data = req.body;

    await db.updateOne(
      {
        mail: data.mail,
        "list._id": data.id,
      },
      {
        $set: {
          "list.$.title": data.title,
          "list.$.lists": data.list,
        },
      },
    );

    res.json({
      success: true,
      message: "List updated",
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
