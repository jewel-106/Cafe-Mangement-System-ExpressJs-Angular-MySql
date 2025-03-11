const express = require("express");
const connection = require("../connection");
const router = express.Router();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const bcrypt = require("bcryptjs");
var auth = require("../services/authentication");
var checkRole = require("../services/checkRole");

var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Signup - Create new user
router.post("/signup", (req, res) => {
  let user = req.body;
  query = "select email,password,role,status from user where email = ?";
  connection.query(query, [user.email], (err, result) => {
    if (!err) {
      if (result.length <= 0) {
        query =
          "insert into user(name,contactNumber,email,password,status,role) values(?,?,?,?,'false','user')";
        connection.query(
          query,
          [user.name, user.contactNumber, user.email, bcrypt.hashSync(user.password, 10)],
          (err, result) => {
            if (!err) {
              return res
                .status(200)
                .json({ message: "Successfully Registered", result: user });
            } else {
              return res.status(500).json(err);
            }
          }
        );
      } else {
        return res.status(400).json({ message: "Email Already Exist." });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

// Login - User login
router.post("/login", (req, res) => {
  const user = req.body;
  query = "select email,password,role,status from user where email=?";
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0 || !bcrypt.compareSync(user.password, results[0].password)) {
        return res
          .status(401)
          .json({ message: "Incorrect Username or Password" });
      } else if (results[0].status == "false") {
        return res.status(401).json({ message: "Wait for Admin Approval" });
      } else {
        const response = { email: results[0].email, role: results[0].role };
        const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {
          expiresIn: "8h",
        });
        res.status(200).json({ token: accessToken });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

// Forgot Password - Generate OTP and send via email
router.post("/forgotpassword", (req, res) => {
  const user = req.body;
  query = "select email from user where email=?";
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        return res.status(400).json({ message: "Email not found." });
      } else {
        const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

        // Save OTP to the database with check_otp false (not verified yet)
        query = "insert into otp_requests (email, otp, check_otp) values (?, ?, false)";
        connection.query(query, [user.email, otp], (err, result) => {
          if (!err) {
            // Send OTP via email
            var mailOptions = {
              from: process.env.EMAIL,
              to: user.email,
              subject: "Password Reset OTP for Cafe Management System",
              html: `<p>Your OTP to reset your password is: <b>${otp}</b></p>
                     <p><b>Note:</b> OTP is valid for 15 minutes only.</p>`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                return res.status(500).json({ message: "Failed to send OTP." });
              } else {
                return res.status(200).json({ message: "OTP sent successfully to your email." });
              }
            });
          } else {
            return res.status(500).json(err);
          }
        });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

// Verify OTP - To verify the OTP sent via email
router.post("/verifyOtp", (req, res) => {
  const { email, otp } = req.body;
  query = "select * from otp_requests where email=? and otp=? and check_otp=false";
  connection.query(query, [email, otp], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        return res.status(400).json({ message: "Invalid OTP or OTP already verified." });
      } else {
        // Update OTP status to true (verified)
        query = "update otp_requests set check_otp=true where email=? and otp=?";
        connection.query(query, [email, otp], (err, result) => {
          if (!err) {
            return res.status(200).json({ message: "OTP verified. You can now reset your password." });
          } else {
            return res.status(500).json(err);
          }
        });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

// Reset Password - After OTP verification
router.post("/resetPassword", (req, res) => {
  const { email, newPassword } = req.body;
  const hashedNewPassword = bcrypt.hashSync(newPassword, 10); // Hash the new password

  query = "update user set password=? where email=?";
  connection.query(query, [hashedNewPassword, email], (err, results) => {
    if (!err) {
      // Optionally, delete the OTP after password reset
      query = "delete from otp_requests where email=?";
      connection.query(query, [email], (err, result) => {
        if (!err) {
          return res.status(200).json({ message: "Password reset successfully." });
        } else {
          return res.status(500).json(err);
        }
      });
    } else {
      return res.status(500).json(err);
    }
  });
});

// Get All Users - Admin Only (authentication and authorization)
router.get("/get", auth.authenticateToken, checkRole.checkRole, (req, res) => {
  var query =
    "select id,name,email,contactNumber,status from user where role='user'";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

// Update User Status - Admin Only
router.patch(
  "/update",
  auth.authenticateToken,
  checkRole.checkRole,
  (req, res) => {
    let user = req.body;
    var query = "update user set status=? where id=?";
    connection.query(query, [user.status, user.id], (err, results) => {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "User id does not exist" });
        }
        return res.status(200).json({ message: "User Updated Successfully" });
      } else {
        return res.status(500).json(err);
      }
    });
  }
);

// Check Token - To verify the authentication token
router.get("/checkToken", auth.authenticateToken, (req, res) => {
  return res.status(200).json({ message: "true" });
});

// Change Password - After authenticating the user
router.post("/changePassword", auth.authenticateToken, (req, res) => {
  const user = req.body;
  const email = res.locals.email; // Email from the token

  // First, get the user's current hashed password from the database
  var query = "select password from user where email=?";
  connection.query(query, [email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        return res.status(400).json({ message: "User not found" });
      }

      // Compare the provided oldPassword with the hashed password from the database
      if (!bcrypt.compareSync(user.oldPassword, results[0].password)) {
        return res.status(400).json({ message: "Incorrect Old Password" });
      }

      // Hash the new password before updating it
      query = "update user set password=? where email=?";
      connection.query(query, [bcrypt.hashSync(user.newPassword, 10), email], (err, results) => {
        if (!err) {
          return res.status(200).json({ message: "Password Updated Successfully." });
        } else {
          return res.status(500).json(err);
        }
      });
    } else {
      return res.status(500).json(err);
    }
  });
});


module.exports = router;
