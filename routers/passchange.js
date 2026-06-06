const express = require("express");
const router = express.Router();
const db = require("../database/schemes/userscheme");

router.post("/passchange", async (req, res) => {
  const token = req.body;
  const data = await db.findOne({ mail: token.mail });
  if (data) {
    await db.updateOne({ mail: token.mail }, { $set: { pass: token.pass } });
    res.json({
      msg: true,
    });
  } else {
    return res.json({
      info: "User Not Exists",
      msg: false,
    });
  }
});
module.exports = router;
