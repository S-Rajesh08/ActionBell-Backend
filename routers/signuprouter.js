const express = require("express");
const router = express.Router();
const db = require("../database/schemes/userscheme");
router.post("/signup", async (req, res) => {
  const token = req.body;
  const data = await db.findOne({ mail: token.mail });
  if (data) {
    return res.json({
      info: "Mail Aleady Exist Sign In",
      msg: false,
    });
  } else {
    const allow = ["gmail.com", "sastra.ac.in"];
    const domain = token.mail.split("@")[1];
    if (!allow.includes(domain)) {
      return res.json({
        info: "Invalid Domain",
        msg: false,
      });
    } else {
      return res.json({
        info: "signup success",
        msg: true,
        user: token,
      });
    }
  }
});
module.exports = router;
