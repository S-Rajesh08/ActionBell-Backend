const express = require("express");
const router = express.Router();
const db = require("../database/schemes/userscheme");
router.post("/deletelist", async (req, res) => {
  const data = req.body;
  await db.updateOne(
    { mail: data.mail },
    { $pull: { list: { _id: data.id } } },
  );
  res.json({
    msg: true,
  });
});
module.exports = router;
