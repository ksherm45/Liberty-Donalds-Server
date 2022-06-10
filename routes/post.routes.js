const express = require("express");
const router = express.Router();
const PostModel = require("../models/Post.model");
// include CLOUDINARY:
const uploader = require("../config/cloudinary.config.js");
const PostModelImages = require("../models/PostImages.model");


//NOTE: All API routes will start from /api
//Will hande all GET requests to http:localhost:5005/api/posts

router.get("/", (req, res) => {
  PostModel.find()
    .populate("id")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

// Will handle all POST requests to http:localhost:5005/api/create

router.post("/post", (req, res) => {
  // const {name, description} = req.body;
  PostModel.create(req.body)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

router.post("/uploadFile", uploader.single("image"), (req, res) => {
  // const {name, description} = req.body;
  // console.log("here is the path", req.file);
  // console.log("here is the body", req.body);

  let obj = {
    name: req.body.name,
   image: req.file.path,
    description: req.body.description
              }
  console.log("here is the objjjj", obj)
  PostModelImages.create(obj)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

router.get("/blahblah/:videoId", (req, res) => {
  const {videoId} = req.params
  PostModel.findById(videoId)
  .then((response) => {
    console.log("post response", response);
    res.status(200).json(response);
  })
  .catch((err) => {
    res.status(500).json({
      error: "Something went wrong",
      message: err,
    });
  });
});

router.get("/get-posts", (req, res) => {
  PostModel.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

router.delete("/post/:id", (req, res) => {
  const id = req.params.id;
  console.log("made it to server");
  console.log(id);
  PostModel.findByIdAndDelete(req.params.id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

// will handle all PATCH requests to http:localhost:5005/api/ball/:id

router.patch("/post/:id", (req, res) => {
  let id = req.params.id;
  const { name, description, completed } = req.body;
  PostModel.findByIdAndUpdate(
    id,
    { $set: { name: name, description: description, completed: completed } },
    { new: true }
  )
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

module.exports = router;