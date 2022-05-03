const router = require("express").Router();
const PostModel = require('../models/Post.model');
const UserModel = require('../models/User.model');

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");


// How many rounds should bcrypt run the salt (default [10 - 12 rounds])


// Require the User model in order to interact with the database


// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");



router.post("/signup", (req, res) => {
const {username, password} = req.body;  //for future reference always make sure destructured names match Model names - see UserModel.Create below
console.log(req.body);


 let salt = bcrypt.genSaltSync(10);
 let hash = bcrypt.hashSync(password, salt);
UserModel.create({username, password: hash })  // ALWAYS MAKE SURE THE DESTRUCTURED NAMES ALIGN. ADD EMAIL ABOVE AND HERE IF WANTED LATER
  .then((user) => {
    user.passwordHash = "***";
    res.status(200).json(user);
  })
  .catch((err) => {
    if (err.code === 11000) {
      res.status(500),json({
        errorMessage: 'Username is already taken!',
        message: err,
      });
    }
    else {
      res.status(500).json({
        errorMessage: 'Something went wrong',
        message: err,
      });
    }
  });

});




//SERVER SIDE VALIDATION -- UNBLOCK AT THE END OF PRODUCTION

  

  //   ! This use case is using a regular expression to control for special characters and min length
  /*
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!regex.test(password)) {
    return res.status(400).render("signup", {
      errorMessage:
        "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
  }
  */


    //will handle all POST requests to http:localhost:5005/api/signin

router.post('/signin', (req, res) => {
  const {username, password} = req.body;
  
 // -----SERVER SIDE VALIDATION ----------
    /*
    if ( !email || !password) {
        res.status(500).json({
            error: 'Please enter Username. email and password',
       })
      return;  
    }
    const myRegex = new RegExp(/^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/);
    if (!myRegex.test(email)) {
        res.status(500).json({
            error: 'Email format not correct',
        })
        return;  
    }
    */

  // Search the database for a user with the username submitted in the form
  UserModel.findOne({ username })
    .then((userData) => {
      console.log("made it here" , userData)
    // If the user is found, send the message username is taken
    let doesItMatch = bcrypt.compareSync(password, userData.passwordHash)
    if (doesItMatch) {
      userData.passwordHash = "***";
      req.session.loggedInUser = userData;
      res.status(200).json(userData)
    }
  })
    //if the passwords do not match -->
  //   else {
  //     res.status(500).json({
  //       error: "Passwords do not match",
  //     })
  //     return;
  //   }
  // });
  // //Throw an error if the user does not exist
  // .catch((err) => {
  //   res.status(500).json({
  //     error: 'Email does not exist',
  //     message: err
  //   })
  //   return;
   });
 
// will handle all POST  requests to http:localhost:5005/api/logout
router.post('/logout', (req, res) => {
  req.session.destroy();
  //Send nothing back to the user
  res.status(204).json({});
});


//Will handled all requests to http:localhost:5005/api/user
router.get("/user", isLoggedIn, (req, res, next) => {
  res.status(200).json(req.session.loggedInUser);
});

module.exports = router