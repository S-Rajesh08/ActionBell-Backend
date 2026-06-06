const express = require("express");
const router = express.Router();
const db = require("../database/schemes/userscheme");

router.post("/signin", async (req, res) => {
  const token = req.body;
  const data = await db.findOne({ mail: token.mail });
  if (data) {
    if (data.pass === token.pass) {
      return res.json({
        mail: data.mail,
        msg: true,
      });
    } else {
      return res.json({
        info: "Invalid Password",
        msg: false,
      });
    }
  } else {
    return res.json({
      info: "User Not Exists",
      msg: false,
    });
  }
});
module.exports = router;
