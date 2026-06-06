const express = require("express");
const router = express.Router();
const db = require("../database/schemes/userscheme");
router.post("/listfetch", async (req, res) => {
  const { mail } = req.body;
  const user = await db.findOne({ mail: mail });
  res.json({
    list: user.list,
  });
});
module.exports = router;
