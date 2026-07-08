const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/otp", async (req, res) => {
  const { mail } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);

  const transport = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure:true,
        auth: {
          user: process.env.GMAIL,
          pass: process.env.PASS,
        },
        connectionTimeout:10000,
      });
  const appName = "ActionBell"; // Change to "DocVault" when needed

  await transport.sendMail({
    from: process.env.GMAIL,
    to: mail,
    subject: `${appName} OTP Verification`,
    html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 500px; margin: auto; border: 1px solid #ddd; border-radius: 10px;">
      
      <h1 style="color: #2E8B57; text-align: center;">
        ${appName}
      </h1>

      <p>Hello,</p>

      <p>
        Thank you for using <strong>${appName}</strong>.
        Please use the following One-Time Password (OTP) to continue:
      </p>

      <div style="text-align: center; margin: 25px 0;">
        <span style="
          background: #000;
          color: #fff;
          padding: 12px 25px;
          font-size: 24px;
          font-weight: bold;
          border-radius: 8px;
          letter-spacing: 4px;
          display: inline-block;
        ">
          ${otp}
        </span>
      </div>

      <p>This OTP is valid for <strong>10 minutes</strong>.</p>

      <p>Please do not share this code with anyone.</p>

      <hr style="margin:20px 0">

      <p style="color: #666; font-size: 14px;">
        If you did not request this OTP, you can safely ignore this email.
      </p>

      <p>
        Regards,<br>
        <strong>The ${appName} Team</strong>
      </p>

    </div>
  `,
  });
  return res.json({ otp: otp });
});
module.exports = router;
