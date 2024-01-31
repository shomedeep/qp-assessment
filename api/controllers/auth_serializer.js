const models = require("../../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Validator = require("fastest-validator");

// Create a admin user account
const signUp = (req, res, next) => {
  const { name, email, password } = req.body;

  // validate input
  const scehma = {
    name: { type: "string", optional: false, max: "100" },
    email: { type: "string", optional: false, max: "100" },
    password: { type: "string", optional: false, max: "100" },
  };

  const objClass = new Validator();
  const validationResponse = objClass.validate(
    { name, email, password },
    scehma
  );
  if (validationResponse !== true) {
    res
      .status(400)
      .json({ message: "Validation failed", error: validationResponse });
  }

  models.User.findOne({ where: { email: email } })
    .then((result) => {
      if (result) {
        res.status(409).json({
          message: "Email already exists",
        });
      } else {
        bcryptjs.genSalt(10, (err, salt) => {
          bcryptjs.hash(password, salt, (err, hash) => {
            models.User.create({ name, email, password: hash })
              .then((result) => {
                res.status(201).json({
                  message: "User created successfully",
                  user: result,
                });
              })
              .catch((err) => {
                next(err);
              });
          });
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  models.User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user && user === null) {
        res.status(401).json({
          message: "Invalid credentials",
        });
      } else {
        bcryptjs.compare(password, user.password, (err, result) => {
          if (result) {
            jwt.sign(
              { email: user.email, userId: user.id },
              process.env.JWT_KEY,
              (err, token) => {
                res.status(200).json({
                  message: "User login authentication successful",
                  token: token,
                });
              }
            );
          } else {
            res.status(401).json({
              message: "Invalid credentials",
            });
          }
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  signUp,
  login,
};
