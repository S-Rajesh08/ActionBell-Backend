const express = require("express");
const router = express.Router();
const db = require("../database/schemes/userscheme");
router.post("/addlist", async (req, res) => {
  const data = req.body;
  await db.updateOne(
    { mail: data.mail },
    { $push: { list: { title: data.title, lists: data.list } } },
  );
  res.json({
    msg: true,
  });
});
module.exports = router;
