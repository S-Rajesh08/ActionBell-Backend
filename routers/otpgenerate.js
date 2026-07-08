const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/otp", async (req, res) => {
  const { mail } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);

  const appName = "ActionBell"; // Change to "DocVault" in DocVault backend

  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: appName,
          email: "rajeshsenthil008@gmail.com",
        },
        to: [
          {
            email: mail,
          },
        ],
        subject: `${appName} OTP Verification`,
        htmlContent: `
        <div style="font-family: Arial, sans-serif; padding:20px; max-width:500px; margin:auto; border:1px solid #ddd; border-radius:10px;">
          <h1 style="color:#2E8B57; text-align:center;">
            ${appName}
          </h1>

          <p>Hello,</p>

          <p>
            Thank you for using <strong>${appName}</strong>.
            Please use the following OTP to continue.
          </p>

          <div style="text-align:center; margin:25px 0;">
            <span style="
              background:#000;
              color:#fff;
              padding:12px 25px;
              font-size:24px;
              font-weight:bold;
              border-radius:8px;
              letter-spacing:4px;
              display:inline-block;
            ">
              ${otp}
            </span>
          </div>

          <p>This OTP is valid for <strong>10 minutes</strong>.</p>

          <p>Please do not share this OTP with anyone.</p>

          <hr>

          <p style="font-size:14px; color:#666;">
            If you didn't request this OTP, simply ignore this email.
          </p>

          <p>
            Regards,<br>
            <strong>The ${appName} Team</strong>
          </p>
        </div>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("OTP email sent successfully");

    return res.json({ otp });

  } catch (err) {
    console.log(
      "Brevo Error:",
      err.response?.data || err.message
    );

    return res.status(500).json({
      msg: false,
      error: "Unable to send OTP email",
    });
  }
});

module.exports = router;