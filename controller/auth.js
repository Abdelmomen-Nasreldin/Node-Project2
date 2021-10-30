const users = require("./../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config()


// register new user /////////////////////////////
exports.register = (req, res) => {
  users.findOne(
    {
      email: req.body.email,
    },
    function (err, user) {
      if (!req.body.email) {
        return res.send("you must have an email");
      }
      if (!req.body.userName) {
        return res.send("you must have a username");
      }
      if (!req.body.password) {
        return res.send("you must have a password");
      }
      if (user) {
        return res.send("user email is already registered");
      }
      user = new users({
        userName: req.body.userName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        // type: req.body.type    =====> change it from the DB
      });
      user
        .save()
        .then(res.status(200).send(user))
        .catch((err) => {
          res.status(500).send(err);
        });
    }
  );
};
//login user ////////////////////
exports.login = (req, res) => {
  users.findOne(
    {
      email: req.body.email,
    },
    function (err, user) {
      if (err) {
        return res.status(500).send("there is a problem with the server ");
      }
      if (!req.body.email) {
        return res.status(400).send("please type your email");
      }
      if (!req.body.password) {
        return res.status(400).send("please type your password");
      }
      if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(404).send("user not found, please register first");
      }
      // if (!user) {
      //   return res.status(404).send("user not found, please register first");
      // }

      // if (!bcrypt.compareSync(req.body.password, user.password)) {
      //   return res.status(401).send("password is incorrect")
      // }

      // const tokenKey = process.env.JWT_KEY;
      const JWTacc = jwt.sign(
        {
          // email: user.email,
          id: user._id,
          type: user.type,
        },
        process.env.JWT_KEY,
        { expiresIn: "30d" }
      );
      res.status(200).send({
        user,
        token : JWTacc
      });
    }
  );
};
