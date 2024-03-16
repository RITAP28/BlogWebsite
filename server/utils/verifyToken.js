const errorHandler = require('../utils/error');
const jwt = require('jsonwebtoken')
const express = require('express');

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);
    if(!token){
        return next(errorHandler(401, 'Unauthorized'));
    }
    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
        req.user = decoded;
        console.log(token);
        console.log('Heelo');
        next();
    } catch (error) {
        console.error(error)
    }
};

module.exports = verifyToken;