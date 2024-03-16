const express = require('express');

const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            "http://localhost:5173",
        ];
        const isAllowed = allowedOrigins.includes(origin);
        callback(null, isAllowed ? origin : false);
    },
    methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
    credentials: true,
}

module.exports = corsOptions;