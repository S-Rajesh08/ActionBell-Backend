const express = require("express");
const axios = require("axios");
const router = express.Router();
const db = require("../database/schemes/userscheme");

router.post("/emailverify", async (req, res) => {
  const { userotp, user, otp } = req.body;

  if (Number(userotp) !== otp) {
    return res.json({
      info: "Invalid OTP",
      msg: false,
    });
  }

  try {
    // Save user in MongoDB
    await db.insertOne({
      name: user.name,
      mail: user.mail,
      pass: user.pass,
    });

    // Send Welcome Email using Brevo
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "ActionBell",
          email: "YOUR_VERIFIED_GMAIL@gmail.com",
        },
        to: [
          {
            email: user.mail,
          },
        ],
        subject: "Welcome to ActionBell",
        htmlContent: `
        <div style="font-family:Arial;padding:20px;background:#f5f5f5;">
          <div style="background:white;padding:20px;border-radius:10px;">
            <h1 style="color:#2563eb;">
              Welcome 👋
            </h1>

            <p>Hello <strong>${user.name}</strong>,</p>

            <p>
              Your ActionBell account has been created successfully.
            </p>

            <div
              style="
                margin-top:20px;
                padding:10px;
                background:#2563eb;
                color:white;
                width:fit-content;
                border-radius:5px;
              "
            >
              You Will Never Forget
            </div>

            <p style="margin-top:20px;">
              Thank you for choosing ActionBell.
            </p>
          </div>
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

    console.log("Welcome email sent successfully");

    return res.json({
      msg: true,
      mail: user.mail,
    });

  } catch (err) {
    console.error(
      "Brevo Error:",
      err.response?.data || err.message
    );

    return res.status(500).json({
      msg: false,
      info: "Registration failed",
    });
  }
});

module.exports = router;