// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();



// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
// ---------------------------------------------------
//      EXPRESS-SESSION CONFIG
// ---------------------------------------------------
const MONGO_URI = require("./utils/consts");
const session = require("express-session");
const MongoStore = require("connect-mongo");

// app.use(session({
//   secret: process.env.SECRET, //Ideally this will be in you env file
//   resave: false,
//   saveUninitialized: false, 
//   cookie: {
//     maxAge: 1000 * 24* 60 * 60 // your cookie will be cleared after these seconds
//   },
//   store: MongoStore.create({
//     mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/LibertyDonalds",
//     // Time to Live for sessions in DB. After that time it will delete it!
//     ttl: 24* 60 * 60 // your session will be cleared after these seconds
//   })
// }));

app.use(
  session({
    secret: "NotMyAge",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // is in milliseconds.  expiring in 1 day
    },
    store: new MongoStore({
      mongoUrl: MONGO_URI,
      ttl: 60 * 60 * 24, // is in seconds. expiring in 1 day
    }),
  })
);


// ---------------------------------------------------
//      EXPRESS-SESSION CONFIG
// ---------------------------------------------------


// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
//const allRoutes = require("./routes");
//app.use("/api", allRoutes);

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));



const authRoutes = require("./routes/auth.routes");
app.use("/api", authRoutes);

const postRoutes = require("./routes/post.routes");
app.use("/api", postRoutes);

const imageRoutes = require("./routes/postimage.routes");
app.use("/api", imageRoutes);

app.use((req, res, next) => {
	// If no routes match, send them the React HTML.
	res.sendFile(__dirname + "/public/index.html");
});


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
