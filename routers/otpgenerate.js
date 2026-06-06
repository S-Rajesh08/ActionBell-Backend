const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/otp", async (req, res) => {
  const { mail } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL,
      pass: process.env.PASS,
    },
  });
  await transport.sendMail({
    from: process.env.GMAIL,
    to: mail,
    subject: "OTP Verification",
    html: `<div style="font-family:sans-serif;padding:20px">
                       <h1 style="color:green">ActionBell</h1>
                        <p>OTP :</p>
                        <h3 style="background:black;color:white;padding:10px;width:120px;text-align:center">${otp}</h3>
                        </div>
            
            `,
  });
  return res.json({ otp: otp });
});
module.exports = router;
