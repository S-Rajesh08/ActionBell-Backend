const express = require("express");
const router = express.Router();
const db = require("../database/schemes/userscheme");

router.post("/mailverify", async (req, res) => {
  const { mail } = req.body;
  const data = await db.findOne({ mail: mail });
  if (data) {
    return res.json({
      msg: true,
    });
  } else {
    return res.json({
      info: "Mail id not exist",
      msg: false,
    });
  }
});
module.exports = router;
