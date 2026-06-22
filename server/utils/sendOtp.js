const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtp = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset OTP",
    html: `
      <h2>AI Resume Analyzer</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>Valid for 10 minutes.</p>
    `,
  });
};

module.exports = sendOtp;