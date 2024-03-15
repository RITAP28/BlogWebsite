const express = require('express');
const {Post, User} = require('../model/userModel');
const errorHandler = require('../utils/error');

async function handleNewPost(req, res, next){
    const { title, content } = req.body;

    if(!title || !content){
        return next(errorHandler(400, 'All fields are required'));
    };

    const user = await User.findOne({ username: req.user.username});

    const post = new Post({
        title,
        content,
        author: user._id
    });

    try {
        await post.save();
        res.status(200).json({
            msg: 'Posted successfully'
        })
    } catch(err){
        console.error(err);
    }
};

async function handleUpdatePost(req, res, next){
    console.log('Hello');
}

async function handleGetPosts(req, res, next){
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed in fetching posts",
        });
    };
};

module.exports = {handleNewPost, handleUpdatePost, handleGetPosts};