const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const db = require("../database/schemes/userscheme");

router.post("/emailverify", async (req, res) => {
  const { userotp, user, otp } = req.body;
  if (Number(userotp) === otp) {
    await db.insertOne({ name: user.name, mail: user.mail, pass: user.pass });
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASS,
      },
    });
    await transport.sendMail({
      from: process.env.GMAIL,
      to: user.mail,
      subject: "Welcome to ActionBell",
      html: `
    <div style="
      font-family: Arial;
      padding: 20px;
      background: #f5f5f5;
    ">
      <div style="
        background: white;
        padding: 20px;
        border-radius: 10px;
      ">
        <h1 style="color: #2563eb;">
          Welcome 👋
        </h1>

        <p>
          Hello ${user.name},
        </p>

        <p>
          You have successfully logged into your ActionBell account.
        </p>

        
        <div style="
          margin-top:20px;
          padding:10px;
          background:#2563eb;
          color:white;
          width:fit-content;
          border-radius:5px;
        ">
          You will Never Forgot
        </div>
      </div>
    </div>
  `,
    });

    return res.json({ msg: true, mail: user.mail });
  } else {
    return res.json({ info: "Invalid OTP", msg: false });
  }
});
module.exports = router;
