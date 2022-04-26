const express = require('express')
const router = express.Router()
const PostModel = require('../models/Post.model')

//NOTE: All API routes will start from /api
//Will hande all GET requests to http:localhost:5005/api/posts

router.get('/', (req, res) => {
    PostModel.find()
    .populate('id')
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(500).json({
                error: 'Something went wrong',
                message: err
            })
        })
        
})

// Will handle all POST requests to http:localhost:5005/api/create

router.post('/create', (req, res) => {
    const {name, description} = req.body;

    PostModel.create({name, description})
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(500).json({
                error: 'Something went wrong',
                message: err
            })
        })
})

