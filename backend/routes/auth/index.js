const express = require("express")
const router = express.Router();
const { db } = require('../../db/models')

router.get("/signin", signIn);

router.get("/signup", signUp);

function signUp(req, res) {
  res.send({
      status: 200,
      message: "Registered Successfully",
      data: {
          username: "adilsaeed31@gmail.com",
      }
  })  
}

function signIn(req, res) {
  db.User.findAll().then(users => {
    if (users.length > 0) {
      res.send({
        status: 200,
        message: "Logged In",
        data: users
      })
    } else {
    res.send({
    status: 200,
    message: "Logged In",
    data: {
        username: "adilsaeed31@gmail.com",
        authToken: "b234al3gal-234asd-s9asd8-348-as9d8asdf"
    }})
  }
})
}

module.exports = router;
