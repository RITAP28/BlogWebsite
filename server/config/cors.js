const express = require('express');

// const whiteList = [
//     'http://localhost:5173'
// ];
const corsOptions = {
    // origin: function(origin, callback) {
    //     if (whiteList.indexOf(origin) !== -1) {
    //         callback(null, true);
    //     } else {
    //         callback(new Error('Not allowed by CORS'));
    //     }
    // },
    origin: 'http://localhost:5173',
    methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
    credentials: true,
}

module.exports = corsOptions;