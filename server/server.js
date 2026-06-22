const resumeRoutes = require("./routes/resumeRoutes");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
// const passport = require("./passport");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: "githubloginsecret",
    resave: false,
    saveUninitialized: false,
  })
);

// app.use(passport.initialize());
// app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

/*
app.get(
  "/api/auth/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

app.get(
  "/api/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("https://ai-resume-analyzer-tawny-rho.vercel.app/dashboard");
  }
);
*/

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

app.listen(process.env.PORT, () => {
  console.log(`Server Running on Port ${process.env.PORT}`);
});